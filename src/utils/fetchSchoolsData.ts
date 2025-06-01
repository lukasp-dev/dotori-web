export async function fetchSchoolsData() {
    const mockMode = process.env.NEXT_PUBLIC_MOCK_MODE === "true";
    const url = mockMode ? "/mock_recommendations.json" : `${process.env.NEXT_PUBLIC_API_URL}/api/schools`;

    console.log("Fetching from:", url);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch schools data");
    }

    const data = await response.json();
    return data;
}