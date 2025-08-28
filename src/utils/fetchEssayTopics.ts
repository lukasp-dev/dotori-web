// utils/fetchEssayTopics.ts
export async function fetchEssayTopics(schoolId: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/essays/${schoolId}`,
      { cache: "no-store" });
    
    if (!response.ok) {
      if (response.status === 404) {
        // Return default value when no topics are found
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
    
    const result = {
      supplementary: {} as { [key: string]: string },
      groupEssays: data.groupEssays || []
    };

    let essayIndex = 0;

    // Individual Essays
    if (data.individualEssays && data.individualEssays.length > 0) {
      data.individualEssays.forEach((essay: any) => {
        result.supplementary[essayIndex.toString()] = essay.topic;
        essayIndex++;
      });
    }

    // Default value when no topics are found
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
    // Error handling
    return {
      supplementary: {
        "0": "This school has no supplementary essays"
      },
      groupEssays: []
    };
  }
} 