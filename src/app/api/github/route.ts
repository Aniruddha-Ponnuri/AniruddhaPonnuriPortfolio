import { NextRequest, NextResponse } from 'next/server';
import { getGitHubUser, getGitHubRepos, enrichRepoData } from '@/app/lib/github';
import { unstable_cache } from 'next/cache';

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
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username') || process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const data = await getGitHubData(username);

    return NextResponse.json(data);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
