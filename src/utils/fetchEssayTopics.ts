// utils/fetchEssayTopics.ts
export async function fetchEssayTopics(schoolId: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/essays/${schoolId}`,
      { cache: "no-store" });
    
    if (!response.ok) {
      if (response.status === 404) {
        // 에세이 토픽이 없는 경우 기본값 반환
        return {
          supplementary: {
            "0": "This school has no supplementary essays"
          },
          groupEssays: []
        };
      }
      throw new Error("Failed to fetch essay topics");
    }

    const data = await response.json();
    
    // 새로운 API 응답 형식을 기존 구조로 변환
    const result = {
      supplementary: {} as { [key: string]: string },
      groupEssays: data.groupEssays || []
    };

    let essayIndex = 0;

    // individualEssays 처리 (Supplementary Essay 1, 2, 3...)
    if (data.individualEssays && data.individualEssays.length > 0) {
      data.individualEssays.forEach((essay: any) => {
        result.supplementary[essayIndex.toString()] = essay.topic;
        essayIndex++;
      });
    }

    // groupEssays는 별도로 유지 (supplementary에 추가하지 않음)
    // groupEssays는 이미 result.groupEssays에 포함되어 있음

    // 데이터가 없으면 기본값 반환
    if (Object.keys(result.supplementary).length === 0) {
      return {
        supplementary: {
          "0": "This school has no supplementary essays"
        },
        groupEssays: []
      };
    }

    return result;
  } catch (error) {
    console.error("Error fetching essay topics:", error);
    // 에러 발생 시 기본값 반환
    return {
      supplementary: {
        "0": "This school has no supplementary essays"
      },
      groupEssays: []
    };
  }
} 