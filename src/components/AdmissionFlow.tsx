"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ResumePrompt from "@/components/prompts/ResumePrompt";
import PersonalInfoModal from "@/components/common/modals/PersonalInfoModal";
import DashboardPrompt from "@/components/prompts/DashboardPrompt";

type Step = "resume" | "dashboard" | null;

const AdmissionFlow = () => {
  const [step, setStep] = useState<Step>("resume");
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fromPayment = localStorage.getItem("fromPayment");
    const personalInfoCompleted = localStorage.getItem("personalInfoCompleted");
  
    if (fromPayment === "true") {
      setStep(null);
      localStorage.removeItem("fromPayment");
    } else if (personalInfoCompleted === "true") {
      setStep("dashboard");
    }
  }, []);

  const handleResumeUploaded = () => {
    setShowPersonalInfoModal(true);
  };

  const handlePersonalInfoCompleted = () => {
    setShowPersonalInfoModal(false);
    localStorage.setItem("personalInfoCompleted", "true"); // ✅ 상태 저장
    router.push("/recommend");
  };
  if (step === "resume") {
    return (
      <>
        <ResumePrompt onNext={handleResumeUploaded} />
        {showPersonalInfoModal && (
          <PersonalInfoModal
            title="Personal Information"
            description="Please fill out your personal information."
            onClose={() => setShowPersonalInfoModal(false)}
            onNext={handlePersonalInfoCompleted}
          />
        )}
      </>
    );
  }


  if (step === "dashboard") {
    return <DashboardPrompt />;
  }
};

export default AdmissionFlow;
