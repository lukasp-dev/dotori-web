import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

/**
 * 업로드할 파일과 경로를 받아 Firebase Storage에 저장하고 download URL 반환
 * @param path 경로 예: "resumes", "transcripts"
 * @param file 업로드할 파일 객체
 */
export const uploadToFirebase = async (path: string, file: File): Promise<string> => {
  const fileRef = ref(storage, `${path}/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};