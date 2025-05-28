import { Storage } from '@google-cloud/storage';
import { getAccessToken } from '@/lib/auth/tokenStorage';

export const getResume = async (userId: string) => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error('No access token found');
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
      return null;
    }

    const [metadata] = await file.getMetadata();
    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    return {
      name: String(metadata.metadata?.originalName || 'resume'),
      url: signedUrl,
      contentType: metadata.contentType,
    };
  } catch (error) {
    console.error('Error getting resume:', error);
    throw error;
  }
}; 