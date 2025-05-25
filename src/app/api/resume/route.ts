import { Storage } from '@google-cloud/storage';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const storage = new Storage({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    });

    const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET_NAME || '';
    const bucket = storage.bucket(bucketName);
    const fileName = `resumes/${userId}/resume`;
    const file = bucket.file(fileName);

    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json(null);
    }

    const [metadata] = await file.getMetadata();
    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    return NextResponse.json({
      name: String(metadata.metadata?.originalName || 'resume'),
      url: signedUrl,
      contentType: metadata.contentType,
    });
  } catch (error) {
    console.error('Error getting resume:', error);
    return NextResponse.json({ error: 'Failed to get resume' }, { status: 500 });
  }
} 