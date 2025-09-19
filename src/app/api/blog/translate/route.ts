import { NextRequest, NextResponse } from 'next/server';
import { translateBlogPost, getLanguageCode } from '@/lib/translation-service';

export async function POST(request: NextRequest) {
  try {
    const { post, targetLanguage } = await request.json();

    if (!post || !targetLanguage) {
      return NextResponse.json(
        { error: 'Post data and target language are required' },
        { status: 400 }
      );
    }

    const translatedPost = await translateBlogPost(post, getLanguageCode(targetLanguage));

    return NextResponse.json({
      success: true,
      translatedPost
    });

  } catch (error) {
    console.error('Blog translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}

