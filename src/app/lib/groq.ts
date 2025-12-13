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
  },
  gitingestOutput: string
): Promise<string> {
  const startTime = Date.now();
  log.info('generateReadme', 'Starting README generation', { repoName: repoData.name });

  // Validate API key is available
  if (!process.env.GROQ_API_KEY) {
    log.error('generateReadme', 'GROQ_API_KEY is not configured');
    throw new Error('GROQ_API_KEY is not configured');
  }

  try {
    const prompt = `Generate a comprehensive, professional README.md for a GitHub repository.

Use the following context obtained from the repository using gitingest:
---
${gitingestOutput}
---

Use the gitingest output as the primary source of truth. Also use the following metadata to enrich the README:

Repository Name: ${repoData.name}
Description: ${repoData.description || 'No description provided'}
Primary Language: ${repoData.language || 'Not specified'}
All Languages: ${Object.keys(repoData.languages).join(', ') || 'Not available'}
Topics/Tags: ${repoData.topics.join(', ') || 'None'}
Live Demo: ${repoData.homepage || 'Not available'}

Please create a well-structured README that includes:
1. Project title and brief description
2. Features section (infer from the gitingest output)
3. Technologies used (based on languages and gitingest output)
4. Installation instructions
5. Usage examples
6. Contributing guidelines
7. License information

Make it engaging, professional, and follow modern README best practices. Use proper Markdown formatting with badges, sections, and clear structure.`;

    log.info('generateReadme', 'Sending request to Groq API', {
      model: 'llama-3.1-8b-instant',
      promptLength: prompt.length,
    });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a technical writer expert at creating comprehensive, professional README files for GitHub repositories. You will be provided with a repository digest from a tool called "gitingest" as the primary context. Create detailed, well-structured documentation that follows best practices, using the gitingest output as the main source of truth.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
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
