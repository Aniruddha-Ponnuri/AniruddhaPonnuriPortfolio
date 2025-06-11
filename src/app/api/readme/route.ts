import { NextRequest, NextResponse } from 'next/server';
import { generateReadme } from '@/app/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repoData } = body;

    if (!repoData) {
      return NextResponse.json({ error: 'Repository data is required' }, { status: 400 });
    }

    const readme = await generateReadme(repoData);

    return NextResponse.json({ readme });
  } catch (error) {
    console.error('README generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate README' },
      { status: 500 }
    );
  }
}
