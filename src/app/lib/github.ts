import { Octokit } from '@octokit/rest';
import { GitHubRepo, GitHubUser, ProjectCard } from '../types';
import { generateTags } from './utils';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const { data } = await octokit.rest.users.getByUsername({
      username,
    });
    return data as GitHubUser;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw new Error('Failed to fetch GitHub user');
  }
}

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username,
      type: 'all',
      sort: 'updated',
      per_page: 100,
    });
    
    return data.filter(repo => !repo.fork && !repo.archived && !repo.private) as GitHubRepo[];
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw new Error('Failed to fetch GitHub repositories');
  }
}

export async function getRepoLanguages(owner: string, repo: string): Promise<Record<string, number>> {
  try {
    const { data } = await octokit.rest.repos.listLanguages({
      owner,
      repo,
    });
    return data;
  } catch (error: unknown) {
    // Silently handle 404s as they're expected for repos without languages or with access restrictions
    if (error && typeof error === 'object' && 'status' in error && (error as { status: number }).status === 404) {
      return {};
    }
    console.error('Error fetching repo languages:', error);
    return {};
  }
}

export async function getRepoReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const { data } = await octokit.rest.repos.getReadme({
      owner,
      repo,
    });
    
    if (data.content) {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    return null;
  } catch (error: unknown) {
    // Silently handle 404s as they're expected for repos without READMEs
    if (error && typeof error === 'object' && 'status' in error && (error as { status: number }).status === 404) {
      return null;
    }
    console.error('Error fetching README:', error);
    return null;
  }
}

export async function enrichRepoData(repos: GitHubRepo[], username: string): Promise<ProjectCard[]> {
  const enrichedRepos = await Promise.allSettled(
    repos.map(async (repo) => {      try {
        const [languages, readme] = await Promise.allSettled([
          getRepoLanguages(username, repo.name),
          getRepoReadme(username, repo.name),
        ]);
        
        const repoLanguages = languages.status === 'fulfilled' ? languages.value : {};
        const repoReadme = readme.status === 'fulfilled' ? readme.value : undefined;
        
        const tags = generateTags(repo, repoLanguages);
        
        const projectCard: ProjectCard = {
          ...repo,
          languages: repoLanguages,
          tags,
        };
        
        if (repoReadme) {
          projectCard.readme = repoReadme;
        }
        
        return projectCard;
      } catch (error) {
        console.error(`Error enriching repo ${repo.name}:`, error);        // Return basic repo data if enrichment fails
        const basicProjectCard: ProjectCard = {
          ...repo,
          languages: {},
          tags: generateTags(repo, {}),
        };
        return basicProjectCard;
      }
    })
  );
  
  // Filter out failed promises and return successful ones
  return enrichedRepos
    .filter((result): result is PromiseFulfilledResult<ProjectCard> => result.status === 'fulfilled')
    .map(result => result.value);
}
