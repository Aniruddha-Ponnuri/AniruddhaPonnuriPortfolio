import { NextRequest, NextResponse } from 'next/server';
import { generateReadme } from '@/app/lib/groq';

// Maximum allowed payload size (100KB)
const MAX_PAYLOAD_SIZE = 100 * 1024;
// Maximum gitingest section lengths (50KB total)
const MAX_GITINGEST_SUMMARY_LENGTH = 4 * 1024;
const MAX_GITINGEST_TREE_LENGTH = 14 * 1024;
const MAX_GITINGEST_CONTENT_LENGTH = 32 * 1024;
const GITINGEST_TIMEOUT_MS = 20_000;
const GITINGEST_API_BASE = process.env.GITINGEST_API_URL || 'https://gitingest.com';

// Simple logger with timestamps and context
const log = {
  info: (context: string, message: string, data?: Record<string, unknown>) => {
    console.log(`[${new Date().toISOString()}] [API/readme] [INFO] [${context}] ${message}`, data ? JSON.stringify(data) : '');
  },
  error: (context: string, message: string, error?: unknown) => {
    console.error(`[${new Date().toISOString()}] [API/readme] [ERROR] [${context}] ${message}`, error);
  },
  warn: (context: string, message: string, data?: Record<string, unknown>) => {
    console.warn(`[${new Date().toISOString()}] [API/readme] [WARN] [${context}] ${message}`, data ? JSON.stringify(data) : '');
  },
};

interface RepoData {
  name: string;
  description: string | null;
  language: string | null;
  languages: Record<string, number>;
  topics: string[];
  homepage: string | null;
  fullName?: string;
  repoUrl?: string;
  license?: string | null;
}

interface GitIngestData {
  summary: string;
  tree: string;
  content: string;
}

function isValidRepoData(data: unknown): data is RepoData {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;

  return (
    typeof obj.name === 'string' &&
    obj.name.length > 0 &&
    obj.name.length <= 100 &&
    (obj.description === null || typeof obj.description === 'string') &&
    (obj.language === null || typeof obj.language === 'string') &&
    (typeof obj.languages === 'object' || obj.languages === undefined) &&
    (Array.isArray(obj.topics) || obj.topics === undefined) &&
    (obj.homepage === null || typeof obj.homepage === 'string') &&
    (obj.fullName === undefined || typeof obj.fullName === 'string') &&
    (obj.repoUrl === undefined || typeof obj.repoUrl === 'string') &&
    (obj.license === undefined || obj.license === null || typeof obj.license === 'string')
  );
}

function isValidGitIngestData(data: unknown): data is GitIngestData {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;

  return (
    typeof obj.summary === 'string' &&
    typeof obj.tree === 'string' &&
    typeof obj.content === 'string'
  );
}

function resolveRepoUrl(repoData: RepoData): string | null {
  if (repoData.repoUrl?.trim()) {
    return repoData.repoUrl.trim();
  }

  if (repoData.fullName?.trim()) {
    return `https://github.com/${repoData.fullName.trim()}`;
  }

  return null;
}

function truncateSection(value: string, maxLength: number, sectionName: string): string {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength)}\n\n[${sectionName} truncated for token safety]`;
}

function sanitizeGitIngestData(data: GitIngestData): GitIngestData {
  return {
    summary: truncateSection(data.summary, MAX_GITINGEST_SUMMARY_LENGTH, 'Summary'),
    tree: truncateSection(data.tree, MAX_GITINGEST_TREE_LENGTH, 'Tree'),
    content: truncateSection(data.content, MAX_GITINGEST_CONTENT_LENGTH, 'Content'),
  };
}

async function fetchGitingestOutput(repoUrl: string, requestId: string): Promise<GitIngestData> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GITINGEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${GITINGEST_API_BASE}/api/ingest`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Origin: 'https://gitingest.com',
        Referer: 'https://gitingest.com/',
      },
      body: JSON.stringify({
        input_text: repoUrl,
        token: '',
        max_file_size: '50',
        pattern_type: 'exclude',
        pattern: '',
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitIngest request failed (${response.status}): ${errorText.slice(0, 300)}`);
    }

    const data = await response.json() as {
      summary?: string;
      tree?: string;
      content?: string;
    };

    if (typeof data.summary !== 'string' || typeof data.tree !== 'string' || typeof data.content !== 'string') {
      throw new Error('GitIngest returned an invalid response shape');
    }

    const digest = sanitizeGitIngestData({
      summary: data.summary,
      tree: data.tree,
      content: data.content,
    });

    log.info('POST', 'GitIngest digest fetched', {
      requestId,
      repoUrl,
      summaryLength: digest.summary.length,
      treeLength: digest.tree.length,
      contentLength: digest.content.length,
    });

    return digest;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);

  log.info('POST', 'Request received', { requestId });

  try {
    // Check content length header
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      log.warn('POST', 'Payload too large', { requestId, contentLength });
      return NextResponse.json(
        { error: 'Payload too large' },
        { status: 413 }
      );
    }

    const body = await request.json();
    const { repoData, gitingestOutput, gitingestData } = body;

    // Validate required fields
    if (!repoData) {
      log.warn('POST', 'Missing repository data', { requestId });
      return NextResponse.json(
        { error: 'Repository data is required' },
        { status: 400 }
      );
    }

    // Validate repoData structure
    if (!isValidRepoData(repoData)) {
      log.warn('POST', 'Invalid repository data format', { requestId });
      return NextResponse.json(
        { error: 'Invalid repository data format' },
        { status: 400 }
      );
    }

    // Validate gitingestData if provided
    if (gitingestData !== undefined && !isValidGitIngestData(gitingestData)) {
      log.warn('POST', 'Invalid gitingestData format', { requestId });
      return NextResponse.json(
        { error: 'gitingestData must include string summary, tree, and content fields' },
        { status: 400 }
      );
    }

    // Validate legacy gitingestOutput if provided
    if (gitingestOutput !== undefined) {
      if (typeof gitingestOutput !== 'string') {
        log.warn('POST', 'gitingestOutput is not a string', { requestId });
        return NextResponse.json(
          { error: 'gitingestOutput must be a string' },
          { status: 400 }
        );
      }
    }

    const repoUrl = resolveRepoUrl(repoData);

    let finalGitingestData: GitIngestData | null = null;

    if (isValidGitIngestData(gitingestData)) {
      finalGitingestData = sanitizeGitIngestData(gitingestData);
    } else if (typeof gitingestOutput === 'string' && gitingestOutput.trim()) {
      finalGitingestData = {
        summary: '',
        tree: '',
        content: truncateSection(gitingestOutput, MAX_GITINGEST_CONTENT_LENGTH, 'Content'),
      };
    } else if (repoUrl) {
      finalGitingestData = await fetchGitingestOutput(repoUrl, requestId);
    }

    if (!finalGitingestData || (!finalGitingestData.tree.trim() && !finalGitingestData.content.trim())) {
      log.warn('POST', 'Missing gitingest context', { requestId, repoName: repoData.name, repoUrl });
      return NextResponse.json(
        { error: 'Unable to collect repository digest from gitingest' },
        { status: 502 }
      );
    }

    log.info('POST', 'Generating README', {
      requestId,
      repoName: repoData.name,
      repoUrl,
      gitingestSummaryLength: finalGitingestData.summary.length,
      gitingestTreeLength: finalGitingestData.tree.length,
      gitingestContentLength: finalGitingestData.content.length,
    });

    const readme = await generateReadme(repoData, finalGitingestData);
    const duration = Date.now() - startTime;

    log.info('POST', 'README generated successfully', {
      requestId,
      repoName: repoData.name,
      duration,
      readmeLength: readme.length,
    });

    return NextResponse.json({ readme }, {
      headers: {
        'X-Request-Id': requestId,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      log.warn('POST', 'Invalid JSON payload', { requestId, duration });
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    log.error('POST', 'README generation failed', { requestId, duration, error });
    return NextResponse.json(
      { error: 'Failed to generate README' },
      { status: 500 }
    );
  }
}
