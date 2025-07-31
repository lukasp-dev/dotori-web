"use client";

import styled from "styled-components";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AlumniSection from "@/components/common/modals/sections/AlumniSection";
import BasicInfoSection from "@/components/common/modals/sections/BasicInfoSection";
import CourseCreditSection from "@/components/common/modals/sections/CourseCreditSection"
import ResidencySection from "@/components/common/modals/sections/ResidencySection";
import ScoreSection from "@/components/common/modals/sections/ScoreSection";
import EnglishTestSection from "@/components/common/modals/sections/EnglishTestSection";
import { isValidGPA, isValidSAT, isValidACT } from "@/utils/scoreValidator";
import { uploadPersonalInfo } from "@/app/api/auth/uploadPersonalInfo";
import { getUserId } from "@/lib/auth/user";

const Title = styled.h2`
  font-family: var(--font-fredoka);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 600px;
  max-height: 70vh; 
  overflow-y: auto;             
  margin: 0 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Close = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textSecondary};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const UploadButton = styled.button`
  background-color: ${(props) => props.theme.colors.textPrimary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;


interface PersonalInfoFlowModalProps {
  onNext: () => void;
  title: string;
  description: string;
  onUpload?: (
    data: {
      highschoolCompletion: boolean;
      firstGeneration: boolean;
      volunteer: number;
      alumniRelation: {
        hasRelation: boolean;
        schoolNames?: string[];
      };
      residency: {
        status: "Domestic" | "International";
        country?: string;
        state?: string;
      };
      gpa: number;
      testType: "SAT" | "ACT";
      typeScore: number;
      toefl: number;
      coursework: Record<string, number>;
    }
  ) => void;
}

const PersonalInfoFlowModal = ({ onUpload, onNext }: PersonalInfoFlowModalProps) => {
  const { data: session } = useSession();
  const [highschoolCompletion, setHighschoolCompletion] = useState<boolean | null>(null);
  const [volunteer, setVolunteer] = useState("");
  const [courseCredits, setCourseCredits] = useState({
    english: 0,
    math: 0,
    science: 0,
    scienceLab: 0,
    language: 0,
    social: 0,
    arts: 0,
    history: 0, 
    electives: 0, 
    cs: 0
  }); 
  const [hasAlumniRelation, setHasAlumniRelation] = useState<boolean | null>(null);
  const [firstGeneration, setFirstGeneration]= useState<boolean | null>(null);
  const [alumniSchool, setAlumniSchool] = useState<number>(0);
  const [residencyStatus, setResidencyStatus] = useState<"Domestic" | "International" | "">("");
  const [residencyState, setResidencyState] = useState("");
  const [residencyCountry, setResidencyCountry] = useState("");
  const [gpa, setGpa] = useState("");
  const [testType, setTestType] = useState<"SAT" | "ACT">("SAT");
  const [typeScore, setTypeScore] = useState("");
  const [englishTestType, setEnglishTestType] = useState<"TOEFL" | "IELTS" | "Duolingo">("TOEFL");
  const [englishTestScore, setEnglishTestScore] = useState("");

  const handleSubmit = async () => {
    let userId: string | null = null;
  
    const rawUser = localStorage.getItem("user") || localStorage.getItem("userInfo");
    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser);
        userId = parsed.id ?? null;
      } catch (err) {
        alert("⚠️ Failed to parse user info.");
        return;
      }
    }
  
    if (!userId) {
      alert("❌ Please login first.");
      return;
    }
  
    const v = parseInt(volunteer);
    const g = parseFloat(gpa);
    const s = parseInt(typeScore);
  
    const isInternational = residencyStatus === "International";
  
    if (
      highschoolCompletion === null ||
      firstGeneration === null ||
      !residencyStatus ||
      isNaN(v) || isNaN(g) || isNaN(s)
    ) {
      alert("❗ Please complete all required fields.");
      return;
    }
  
    if (!isValidGPA(g)) {
      alert("GPA must be between 0.0 and 4.0");
      return;
    }
  
    if (testType === "SAT" && !isValidSAT(s)) {
      alert("SAT score must be between 400 and 1600");
      return;
    }
  
    if (testType === "ACT" && !isValidACT(s)) {
      alert("ACT score must be between 1 and 36");
      return;
    }
  
    let t = 0;
  
    if (isInternational) {
      t = parseInt(englishTestScore);
      if (isNaN(t)) {
        alert("Please enter your English proficiency test score.");
        return;
      }
  
      switch (englishTestType) {
        case "TOEFL":
          if (t < 0 || t > 120) {
            alert("TOEFL score must be between 0 and 120");
            return;
          }
          break;
        case "IELTS":
          if (t < 0 || t > 9) {
            alert("IELTS score must be between 0 and 9");
            return;
          }
          break;
        case "Duolingo":
          if (t < 0 || t > 160) {
            alert("Duolingo score must be between 0 and 160");
            return;
          }
          break;
        default:
          alert("Please select a valid English proficiency test.");
          return;
      }
    }
  
    const inputData = {
      userId,
      highschoolCompletion,
      firstGeneration,
      volunteer: v,
      alumniRelation: {
        hasRelation: hasAlumniRelation,
        schoolNames: hasAlumniRelation && alumniSchool > 0 ? [alumniSchool.toString()] : undefined,
      },
      residency: {
        status: residencyStatus,
        country: isInternational ? residencyCountry : "",
        state: !isInternational ? residencyState : "",
      },
      gpa: g,
      testType,
      typeScore: s,
      toefl: t,
      englishTestType,
      englishTestScore: t,
      coursework: {
        english: courseCredits.english,
        math: courseCredits.math,
        science: courseCredits.science,
        scienceLab: courseCredits.scienceLab,
        language: courseCredits.language,
        social: courseCredits.social,
        arts: courseCredits.arts,
        history: courseCredits.history, 
        electives: courseCredits.electives, 
        cs: courseCredits.cs
      },
    };
  
    try {
      const result = await uploadPersonalInfo(inputData);
      console.log("✅ Upload successful:", result);
      onNext();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to upload personal info. Please try again.");
    }
  };

  return (
    <Backdrop onClick={(e) => e.target === e.currentTarget}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>Personal Info & Scores</Title>

        <BasicInfoSection {...{ highschoolCompletion, setHighschoolCompletion, firstGeneration, setFirstGeneration, volunteer, setVolunteer}} />
        <CourseCreditSection
          courseCredits={courseCredits}
          setCourseCredits={setCourseCredits}
        />
        <ResidencySection {...{ residencyStatus, setResidencyStatus, setResidencyState, residencyCountry, setResidencyCountry }} />
        <AlumniSection
          hasAlumniRelation={hasAlumniRelation}
          setHasAlumniRelation={setHasAlumniRelation}
          alumniSchool={alumniSchool}
          setAlumniSchool={setAlumniSchool}
        />
        <ScoreSection {...{ gpa, setGpa, testType, setTestType, typeScore, setTypeScore }} />
        <EnglishTestSection {...{ testType: englishTestType, setTestType: setEnglishTestType, typeScore: englishTestScore, setTypeScore: setEnglishTestScore, residencyStatus }} />
        <UploadButton onClick={handleSubmit}>Submit</UploadButton>
      </ModalBox>
    </Backdrop>
  );
};

export default PersonalInfoFlowModal;