"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ResumePrompt from "@/components/prompts/ResumePrompt";
import PersonalInfoModal from "@/components/common/modals/PersonalInfoModal";
import DashboardPrompt from "@/components/prompts/DashboardPrompt";
import ContinuePrompt from "@/components/prompts/ContinuePrompt";
import SignInPrompt from "@/components/prompts/SignInPrompt";

type Step = "resume" | "personalInfo" | "dashboard" | "continue" | null;

const AdmissionFlow = () => {
  const [step, setStep] = useState<Step>("resume");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Don't set any step if user is not logged in
    if (status === "loading" || !session) {
      return;
    }

    const resumeUploaded = localStorage.getItem("resumeUploaded") === "true";
    const personalInfoCompleted = localStorage.getItem("personalInfoCompleted") === "true";
    const recommendCompleted = localStorage.getItem("recommendCompleted") === "true";
    const cartCompleted = localStorage.getItem("cartCompleted") === "true";
    const paymentCompleted = localStorage.getItem("paymentCompleted") === "true";
    const fromPayment = localStorage.getItem("fromPayment") === "true";

    if (fromPayment || paymentCompleted) {
      setStep("dashboard");
      localStorage.removeItem("fromPayment");
    } else if (!resumeUploaded) {
      setStep("resume");
    } else if (!personalInfoCompleted) {
      setStep("personalInfo");
    } else if (!recommendCompleted || !cartCompleted || !paymentCompleted) {
      setStep("continue");
    } else {
      setStep("dashboard");
    }
  }, [session, status]);

  // Show loading while checking session
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Show sign in prompt if user is not logged in
  if (!session) {
    return <SignInPrompt />;
  }

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

  if (step === "continue") {
    return <ContinuePrompt />;
  }

  return null;
};

export default AdmissionFlow;
