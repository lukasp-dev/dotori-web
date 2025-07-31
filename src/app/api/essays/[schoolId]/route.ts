import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const schoolId = parseInt(params.schoolId);
    
    if (isNaN(schoolId)) {
      return NextResponse.json(
        { error: 'Invalid school ID' },
        { status: 400 }
      );
    }

    // 데이터베이스에서 해당 학교의 에세이 토픽 조회
    const essayTopics = await prisma.essayTopics.findMany({
      where: {
        schoolId: schoolId
      },
      select: {
        id: true,
        type: true, // 'common_app' 또는 'supplementary'
        prompt: true,
        order: true, // supplementary 에세이의 순서
        year: true,
        wordLimit: true,
        isRequired: true
      },
      orderBy: [
        { type: 'asc' },
        { order: 'asc' }
      ]
    });

    if (!essayTopics || essayTopics.length === 0) {
      return NextResponse.json(
        { error: 'No essay topics found for this school' },
        { status: 404 }
      );
    }

    // 응답 형식을 기존 mock data 구조와 맞춤
    const response = {
      common_app: '',
      supplementary: {} as { [key: string]: any }
    };

    essayTopics.forEach(topic => {
      if (topic.type === 'common_app') {
        response.common_app = topic.prompt;
      } else if (topic.type === 'supplementary') {
        response.supplementary[topic.order.toString()] = {
          prompt: topic.prompt,
          year: topic.year,
          wordLimit: topic.wordLimit,
          isRequired: topic.isRequired
        };
      }
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching essay topics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 