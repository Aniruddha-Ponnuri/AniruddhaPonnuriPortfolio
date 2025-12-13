import { NextRequest, NextResponse } from 'next/server';
import { generateReadme } from '@/app/lib/groq';

// Maximum allowed payload size (100KB)
const MAX_PAYLOAD_SIZE = 100 * 1024;
// Maximum gitingest output length (50KB)
const MAX_GITINGEST_LENGTH = 50 * 1024;

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
    (obj.homepage === null || typeof obj.homepage === 'string')
  );
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
    const { repoData, gitingestOutput } = body;

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

    // Validate gitingestOutput if provided
    if (gitingestOutput !== undefined) {
      if (typeof gitingestOutput !== 'string') {
        log.warn('POST', 'gitingestOutput is not a string', { requestId });
        return NextResponse.json(
          { error: 'gitingestOutput must be a string' },
          { status: 400 }
        );
      }
      if (gitingestOutput.length > MAX_GITINGEST_LENGTH) {
        log.warn('POST', 'gitingestOutput exceeds maximum length', { requestId, length: gitingestOutput.length });
        return NextResponse.json(
          { error: 'gitingestOutput exceeds maximum length' },
          { status: 400 }
        );
      }
    }

    log.info('POST', 'Generating README', {
      requestId,
      repoName: repoData.name,
      gitingestLength: gitingestOutput?.length || 0,
    });

    const readme = await generateReadme(repoData, gitingestOutput || '');
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
