import { Octokit } from '@octokit/rest';
import { GitHubRepo, GitHubUser, ProjectCard } from '../types';
import { generateTags } from './utils';

// Validate environment variable at module load
if (!process.env.GITHUB_TOKEN) {
  console.warn('[GitHub] Warning: GITHUB_TOKEN is not set. API rate limits will be significantly reduced.');
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Simple logger with timestamps and context
const log = {
  info: (context: string, message: string, data?: Record<string, unknown>) => {
    console.log(`[${new Date().toISOString()}] [GitHub] [INFO] [${context}] ${message}`, data ? JSON.stringify(data) : '');
  },
  error: (context: string, message: string, error?: unknown) => {
    console.error(`[${new Date().toISOString()}] [GitHub] [ERROR] [${context}] ${message}`, error);
  },
  warn: (context: string, message: string, data?: Record<string, unknown>) => {
    console.warn(`[${new Date().toISOString()}] [GitHub] [WARN] [${context}] ${message}`, data ? JSON.stringify(data) : '');
  },
  debug: (context: string, message: string, data?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${new Date().toISOString()}] [GitHub] [DEBUG] [${context}] ${message}`, data ? JSON.stringify(data) : '');
    }
  },
};

export async function getGitHubUser(username: string): Promise<GitHubUser> {
  const startTime = Date.now();
  log.info('getGitHubUser', 'Fetching user profile', { username });

  try {
    const { data } = await octokit.rest.users.getByUsername({
      username,
    });
    const duration = Date.now() - startTime;
    log.info('getGitHubUser', 'User profile fetched successfully', { username, duration });
    return data as GitHubUser;
  } catch (error) {
    const duration = Date.now() - startTime;
    log.error('getGitHubUser', `Failed to fetch user: ${username}`, { duration, error });
    throw new Error('Failed to fetch GitHub user');
  }
}

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const startTime = Date.now();
  log.info('getGitHubRepos', 'Fetching repositories', { username });

  try {
    const { data } = await octokit.rest.repos.listForUser({
      username,
      type: 'all',
      sort: 'updated',
      per_page: 100,
    });

    const filteredRepos = data.filter(repo => !repo.fork && !repo.archived && !repo.private);
    const duration = Date.now() - startTime;
    log.info('getGitHubRepos', 'Repositories fetched successfully', {
      username,
      totalRepos: data.length,
      filteredRepos: filteredRepos.length,
      duration,
    });

    return filteredRepos as GitHubRepo[];
  } catch (error) {
    const duration = Date.now() - startTime;
    log.error('getGitHubRepos', `Failed to fetch repos for: ${username}`, { duration, error });
    throw new Error('Failed to fetch GitHub repositories');
  }
}

export async function getRepoLanguages(owner: string, repo: string): Promise<Record<string, number>> {
  log.debug('getRepoLanguages', 'Fetching languages', { owner, repo });

  try {
    const { data } = await octokit.rest.repos.listLanguages({
      owner,
      repo,
    });
    log.debug('getRepoLanguages', 'Languages fetched', { owner, repo, languages: Object.keys(data) });
    return data;
  } catch (error: unknown) {
    // Silently handle 404s as they're expected for repos without languages or with access restrictions
    if (error && typeof error === 'object' && 'status' in error && (error as { status: number }).status === 404) {
      log.debug('getRepoLanguages', 'No languages found (404)', { owner, repo });
      return {};
    }
    log.warn('getRepoLanguages', `Failed to fetch languages for ${owner}/${repo}`, { error });
    return {};
  }
}

export async function getRepoReadme(owner: string, repo: string): Promise<string | null> {
  log.debug('getRepoReadme', 'Fetching README', { owner, repo });

  try {
    const { data } = await octokit.rest.repos.getReadme({
      owner,
      repo,
    });

    if (data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      log.debug('getRepoReadme', 'README fetched', { owner, repo, contentLength: content.length });
      return content;
    }
    return null;
  } catch (error: unknown) {
    // Silently handle 404s as they're expected for repos without READMEs
    if (error && typeof error === 'object' && 'status' in error && (error as { status: number }).status === 404) {
      log.debug('getRepoReadme', 'No README found (404)', { owner, repo });
      return null;
    }
    log.warn('getRepoReadme', `Failed to fetch README for ${owner}/${repo}`, { error });
    return null;
  }
}

export async function enrichRepoData(repos: GitHubRepo[], username: string): Promise<ProjectCard[]> {
  const startTime = Date.now();
  log.info('enrichRepoData', 'Starting repo enrichment', { username, repoCount: repos.length });

  // Use primary language from listForUser response to avoid N+1 language/readme API requests.
  // README content is fetched on demand when users open the README dialog.
  const enrichedRepos = repos.map((repo) => {
    const repoLanguages = repo.language ? { [repo.language]: 100 } : {};

    return {
      ...repo,
      languages: repoLanguages,
      tags: generateTags(repo, repoLanguages),
    };
  });

  const duration = Date.now() - startTime;

  log.info('enrichRepoData', 'Enrichment complete', {
    username,
    totalRepos: repos.length,
    successfulRepos: enrichedRepos.length,
    failedRepos: 0,
    duration,
  });

  return enrichedRepos;
}
