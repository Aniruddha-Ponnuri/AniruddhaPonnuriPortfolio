import Groq from 'groq-sdk';

// Validate environment variable at module load
if (!process.env.GROQ_API_KEY) {
  console.warn('[GROQ] Warning: GROQ_API_KEY is not set. README generation will fail.');
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Simple logger with timestamps and context
const log = {
  info: (context: string, message: string, data?: Record<string, unknown>) => {
    console.log(`[${new Date().toISOString()}] [GROQ] [INFO] [${context}] ${message}`, data ? JSON.stringify(data) : '');
  },
  error: (context: string, message: string, error?: unknown) => {
    console.error(`[${new Date().toISOString()}] [GROQ] [ERROR] [${context}] ${message}`, error);
  },
  warn: (context: string, message: string, data?: Record<string, unknown>) => {
    console.warn(`[${new Date().toISOString()}] [GROQ] [WARN] [${context}] ${message}`, data ? JSON.stringify(data) : '');
  },
};

export async function generateReadme(
  repoData: {
    name: string;
    description: string | null;
    language: string | null;
    languages: Record<string, number>;
    topics: string[];
    homepage: string | null;
    fullName?: string;
    repoUrl?: string;
    license?: string | null;
  },
  gitingestData: {
    summary: string;
    tree: string;
    content: string;
  }
): Promise<string> {
  const startTime = Date.now();
  log.info('generateReadme', 'Starting README generation', { repoName: repoData.name });

  // Validate API key is available
  if (!process.env.GROQ_API_KEY) {
    log.error('generateReadme', 'GROQ_API_KEY is not configured');
    throw new Error('GROQ_API_KEY is not configured');
  }

  try {
    const prompt = `Create a README.md using only verified information.

  Rules (must follow):
  1. Rely exclusively on details from "Gitingest Tree", "Gitingest Content", "Gitingest Summary", and "Repository Metadata".  
  2. Do not assume or fabricate features, dependencies, setup steps, filenames, links, badges, or system design.  
  3. If any detail is unavailable, omit it or state "Not specified in repository sources".  
  4. Ensure the output is valid Markdown only.  
  5. Respond with Markdown format only (no additional text outside Markdown).  
  6. Always include a License section. If license metadata exists, reproduce it exactly; otherwise write: "License: Not specified in repository sources."
  Repository Metadata:
  - Name: ${repoData.name}
  - Full Name: ${repoData.fullName || 'Not specified'}
  - Repo URL: ${repoData.repoUrl || 'Not specified'}
  - Description: ${repoData.description || 'Not specified'}
  - Primary Language: ${repoData.language || 'Not specified'}
  - All Languages: ${Object.keys(repoData.languages).join(', ') || 'Not specified'}
  - Topics: ${repoData.topics.join(', ') || 'Not specified'}
  - Homepage: ${repoData.homepage || 'Not specified'}
  - License: ${repoData.license || 'Not specified'}

  Gitingest Summary:
  ---
  ${gitingestData.summary || 'Not specified in repository sources'}
  ---

  Gitingest Tree:
  ---
  ${gitingestData.tree || 'Not specified in repository sources'}
  ---

  Gitingest Content:
  ---
  ${gitingestData.content || 'Not specified in repository sources'}
  ---

  Suggested section order:
  - Title
  - Overview
  - Features
  - Tech Stack
  - Installation
  - Usage
  - Contributing
  - License`;

    log.info('generateReadme', 'Sending request to Groq API', {
      model: 'llama-3.1-8b-instant',
      promptLength: prompt.length,
      gitingestTreeLength: gitingestData.tree.length,
      gitingestContentLength: gitingestData.content.length,
    });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a precise technical documentation writer. Produce clean Markdown only. Never hallucinate. If data is not present in provided sources, say "Not specified in repository sources" or omit that detail.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.2,
      max_tokens: 2048,
    });

    const content = chatCompletion.choices[0]?.message?.content;
    const duration = Date.now() - startTime;

    if (!content) {
      log.warn('generateReadme', 'Empty response from Groq API', { duration });
      return 'Failed to generate README - empty response';
    }

    log.info('generateReadme', 'README generated successfully', {
      duration,
      contentLength: content.length,
      usage: chatCompletion.usage,
    });

    return content;
  } catch (error) {
    const duration = Date.now() - startTime;

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        log.error('generateReadme', 'Rate limit exceeded', { duration, error: error.message });
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (error.message.includes('timeout')) {
        log.error('generateReadme', 'Request timeout', { duration, error: error.message });
        throw new Error('Request timed out. Please try again.');
      }
      log.error('generateReadme', 'API error', { duration, error: error.message, stack: error.stack });
    } else {
      log.error('generateReadme', 'Unknown error', { duration, error });
    }

    throw new Error('Failed to generate README with Groq API');
  }
}
