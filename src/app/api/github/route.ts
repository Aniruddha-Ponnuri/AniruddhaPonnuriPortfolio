import { NextRequest, NextResponse } from 'next/server';
import { getGitHubUser, getGitHubRepos, enrichRepoData } from '@/app/lib/github';
import { unstable_cache } from 'next/cache';

// Validate GitHub username format (alphanumeric and hyphens, max 39 chars)
const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

function isValidGitHubUsername(username: string): boolean {
  return GITHUB_USERNAME_REGEX.test(username);
}

// Simple logger with timestamps and context
const log = {
  info: (context: string, message: string, data?: Record<string, unknown>) => {
    console.log(`[${new Date().toISOString()}] [API/github] [INFO] [${context}] ${message}`, data ? JSON.stringify(data) : '');
  },
  error: (context: string, message: string, error?: unknown) => {
    console.error(`[${new Date().toISOString()}] [API/github] [ERROR] [${context}] ${message}`, error);
  },
  warn: (context: string, message: string, data?: Record<string, unknown>) => {
    console.warn(`[${new Date().toISOString()}] [API/github] [WARN] [${context}] ${message}`, data ? JSON.stringify(data) : '');
  },
};

const getGitHubData = unstable_cache(
  async (username: string) => {
    const [user, repos] = await Promise.all([
      getGitHubUser(username),
      getGitHubRepos(username),
    ]);

    const enrichedRepos = await enrichRepoData(repos, username);

    return {
      user,
      repositories: enrichedRepos,
    };
  },
  ['github-data'],
  { revalidate: 3600 }
);

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);

  try {
    const searchParams = request.nextUrl.searchParams;
    // Trim whitespace from username to handle accidental spaces
    const rawUsername = searchParams.get('username') || process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    const username = rawUsername?.trim();

    log.info('GET', 'Request received', { requestId, username: username || 'not provided' });

    if (!username) {
      log.warn('GET', 'Missing username parameter', { requestId });
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Validate username format to prevent injection attacks
    if (!isValidGitHubUsername(username)) {
      log.warn('GET', 'Invalid username format', { requestId, username });
      return NextResponse.json(
        { error: 'Invalid username format' },
        { status: 400 }
      );
    }

    const data = await getGitHubData(username);
    const duration = Date.now() - startTime;

    log.info('GET', 'Request completed successfully', {
      requestId,
      username,
      duration,
      repoCount: data.repositories?.length || 0,
    });

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Request-Id': requestId,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    log.error('GET', 'Request failed', { requestId, duration, error });

    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
