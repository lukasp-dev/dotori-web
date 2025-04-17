"use client";

import { useSession } from "next-auth/react";
import UploadPrompt from "@/components/common/UploadPrompt";
import ScoreModal from "@/components/common/ScoreModal";
import { useState } from "react";

const TestPrompt = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  if (status === "loading" || !session) return null;

  const handleUpload = (score: {
    gpa: number;
    testType: "SAT" | "ACT";
    typeScore: number;
    toefl: number;
  }) => {
    console.log("✅ Submitted:", score);
    setShowModal(false);
  };

  return (
    <>
      <UploadPrompt
        title={`One more step ${session.user?.name}`}
        message="To continue your admission, please upload your scores."
        buttonLabel="Upload Scores"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <ScoreModal
        title={`One more step ${session.user?.name}`}
        description="Please fill out GPA, SAT/ACT, and TOEFL scores to complete your admission."
        onClose={() => setShowModal(false)}
        onUpload={handleUpload}
      />
      )}
    </>
  );
};

export default TestPrompt;