"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ResumePrompt from "@/components/prompts/ResumePrompt";
import PersonalInfoModal from "@/components/common/modals/PersonalInfoModal";
import DashboardPrompt from "@/components/prompts/DashboardPrompt";

type Step = "resume" | "personalInfo" | "dashboard" | null;

const AdmissionFlow = () => {
  const [step, setStep] = useState<Step>("resume");
  const router = useRouter();

  useEffect(() => {
    const resumeUploaded = localStorage.getItem("resumeUploaded") === "true";
    const personalInfoCompleted = localStorage.getItem("personalInfoCompleted") === "true";
    const fromPayment = localStorage.getItem("fromPayment") === "true";

    if (fromPayment) {
      setStep("dashboard");
      localStorage.removeItem("fromPayment");
    } else if (!resumeUploaded) {
      setStep("resume");
    } else if (!personalInfoCompleted) {
      setStep("personalInfo");
    } else {
      setStep("dashboard");
    }
  }, []);

  const handleResumeUploaded = () => {
    localStorage.setItem("resumeUploaded", "true");
    setStep("personalInfo");
  };

  const handlePersonalInfoCompleted = () => {
    localStorage.setItem("personalInfoCompleted", "true");
    router.push("/recommend");
  };
  if (step === "resume") {
    return <ResumePrompt onNext={handleResumeUploaded} />;
  }
  
  if (step === "personalInfo") {
    return (
      <PersonalInfoModal
        title="Personal Information"
        description="Please fill out your personal information."
        onNext={handlePersonalInfoCompleted}
      />
    );
  }
  
  if (step === "dashboard") {
    return <DashboardPrompt />;
  }
  return null;
};

export default AdmissionFlow;
