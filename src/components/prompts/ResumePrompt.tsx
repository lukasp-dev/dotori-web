"use client";

import { useSession } from "next-auth/react";
import UploadPrompt from "@/components/common/UploadPrompt";
import UploadModal from "@/components/common/modals/UploadModal";
import { useState } from "react";

type ResumePromptProps = {
  onNext: () => void;
};

const ResumePrompt = ({ onNext }: ResumePromptProps) => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  if (status === "loading" || !session) return null;

  const handleUpload = (file: File) => {
    console.log("Resume uploaded:", file.name);
    setShowModal(false);
    onNext();
  };

  return (
    <>
      <UploadPrompt
        title={`Hi, ${session.user?.name} 👋`}
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
