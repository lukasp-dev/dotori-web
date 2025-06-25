// utils/fetchSchoolById.ts
export async function fetchSchoolById(schoolId: number) {
  const mockMode = true;
  const url = mockMode
    ? "/mock_schools.json"
    : `${process.env.NEXT_PUBLIC_API_URL}/api/schools`;

  console.log("Fetching from:", url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch school data");
  }

  const data = await response.json();
  return data.find((school: any) => school.id === schoolId);
}