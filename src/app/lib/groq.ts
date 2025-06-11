import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateReadme(repoData: {
  name: string;
  description: string | null;
  language: string | null;
  languages: Record<string, number>;
  topics: string[];
  homepage: string | null;
}): Promise<string> {
  try {
    const prompt = `Generate a comprehensive, professional README.md for a GitHub repository with the following details:

Repository Name: ${repoData.name}
Description: ${repoData.description || 'No description provided'}
Primary Language: ${repoData.language || 'Not specified'}
All Languages: ${Object.keys(repoData.languages).join(', ') || 'Not available'}
Topics/Tags: ${repoData.topics.join(', ') || 'None'}
Live Demo: ${repoData.homepage || 'Not available'}

Please create a well-structured README that includes:
1. Project title and brief description
2. Features section (infer from name and description)
3. Technologies used (based on languages)
4. Installation instructions
5. Usage examples
6. Contributing guidelines
7. License information

Make it engaging, professional, and follow modern README best practices. Use proper Markdown formatting with badges, sections, and clear structure.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a technical writer expert at creating comprehensive, professional README files for GitHub repositories. Create detailed, well-structured documentation that follows best practices.',
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

    return chatCompletion.choices[0]?.message?.content || 'Failed to generate README';
  } catch (error) {
    console.error('Error generating README:', error);
    throw new Error('Failed to generate README with Groq API');
  }
}
