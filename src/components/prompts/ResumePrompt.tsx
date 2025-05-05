"use client";

import UploadPrompt from "@/components/common/UploadPrompt";
import UploadModal from "@/components/common/modals/UploadModal";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type ResumePromptProps = {
  onNext: () => void;
};

const ResumePrompt = ({ onNext }: ResumePromptProps) => {
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn, user } = useAuth(); // user.name 사용하려면 user도 가져와야 함

  if (!isLoggedIn) return null;

  const handleUpload = (file: File) => {
    console.log("Resume uploaded:", file.name);
    setShowModal(false);
    onNext();
  };

  return (
    <>
      <UploadPrompt
        title={`Hi, ${user?.name ?? "there"} 👋`}
        message="To start your admission, please upload your resume."
        buttonLabel="Upload Resume"
        onClick={() => setShowModal(true)}
      />

      {showModal && (
        <UploadModal
          title="Upload Resume"
          description="Please upload your resume here."
          accept=".pdf,.doc,.docx"
          onClose={() => setShowModal(false)}
          onUpload={handleUpload}
        />
      )}
    </>
  );
};

export default ResumePrompt;
