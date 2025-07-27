// utils/fetchEssayTopics.ts
export async function fetchEssayTopics(schoolId: number) {
  try {
    const response = await fetch(`/api/essays/${schoolId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        // 에세이 토픽이 없는 경우 기본값 반환
        return {
          common_app: "Obstacle or Challenge",
          supplementary: {
            "0": "Optional Prompt",
            "1": "Optional Prompt"
          }
        };
      }
      throw new Error("Failed to fetch essay topics");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching essay topics:", error);
    // 에러 발생 시 기본값 반환
    return {
      common_app: "Obstacle or Challenge",
      supplementary: {
        "0": "Optional Prompt",
        "1": "Optional Prompt"
      }
    };
  }
} 