// src/api/uploadResume.ts
export const uploadResume = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("http://localhost:8080/api/upload/resume", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Upload failed: " + errorText);
    }
  
    return await response.text();
  };
  