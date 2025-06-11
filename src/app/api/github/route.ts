import { NextRequest, NextResponse } from 'next/server';
import { getGitHubUser, getGitHubRepos, enrichRepoData } from '@/app/lib/github';


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username') || process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const [user, repos] = await Promise.all([
      getGitHubUser(username),
      getGitHubRepos(username),
    ]);

    const enrichedRepos = await enrichRepoData(repos, username);

    return NextResponse.json({
      user,
      repositories: enrichedRepos,
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
