"use client";

import { useState } from "react";
import UploadModal from "@/components/common/UploadModal";

const ResumeUpload = () => {
  const [showModal, setShowModal] = useState(false);

  const handleUpload = (file: File) => {
    console.log("Uploaded Resume File:", file.name);
    // 백엔드 연결 시 여기서 API 호출
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload Resume</button>

      {showModal && (
        <UploadModal
          title="Upload Resume"
          description="This will replace your current uploaded resume."
          onClose={() => setShowModal(false)}
          onUpload={handleUpload}
          accept=".pdf,.doc,.docx"
        />
      )}
    </>
  );
};

export default ResumeUpload;