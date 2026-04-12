import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { getRepoReadme } from '@/app/lib/github';

const OWNER_REGEX = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPO_REGEX = /^[A-Za-z0-9._-]{1,100}$/;

function isValidOwner(owner: string): boolean {
  return OWNER_REGEX.test(owner);
}

function isValidRepo(repo: string): boolean {
  return REPO_REGEX.test(repo);
}

async function getCachedReadme(owner: string, repo: string) {
  return unstable_cache(
    async () => getRepoReadme(owner, repo),
    ['github-readme', owner, repo],
    { revalidate: 3600 }
  )();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const owner = (searchParams.get('owner') || '').trim();
    const repo = (searchParams.get('repo') || '').trim();

    if (!owner || !repo || !isValidOwner(owner) || !isValidRepo(repo)) {
      return NextResponse.json(
        { error: 'Invalid owner/repo parameters' },
        { status: 400 }
      );
    }

    const readme = await getCachedReadme(owner, repo);

    return NextResponse.json(
      { readme },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch repository README' },
      { status: 500 }
    );
  }
}
