export const uploadResume = async (file: File, userId: string): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId); // user id

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload/resume`, {
    method: "POST",
    body: formData,
    credentials: "include", 
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Upload failed: " + errorText);
  }

  return await response.text();
};
