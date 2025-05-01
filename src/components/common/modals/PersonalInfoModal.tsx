"use client";

import styled from "styled-components";
import { useState } from "react";
import AlumniSection from "@/components/common/modals/sections/AlumniSection";
import BasicInfoSection from "@/components/common/modals/sections/BasicInfoSection";
import CourseCreditSection from "@/components/common/modals/sections/CourseCreditSection"
import ResidencySection from "@/components/common/modals/sections/ResidencySection";
import ScoreSection from "@/components/common/modals/sections/ScoreSection";
import { isValidGPA, isValidSAT, isValidACT, isValidTOEFL } from "@/utils/scoreValidator";
import { uploadPersonalInfo } from "@/app/api/auth/uploadPersonalInfo";

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
  background-color: ${(props) => props.theme.colors.textSecondary};
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
  }); 
  const [hasAlumniRelation, setHasAlumniRelation] = useState(false);
  const [alumniSchool, setAlumniSchool] = useState<string[]>([]);
  const [residencyStatus, setResidencyStatus] = useState<"Domestic" | "International" | "">("");
  const [residencyState, setResidencyState] = useState("");
  const [residencyCountry, setResidencyCountry] = useState("");
  const [gpa, setGpa] = useState("");
  const [testType, setTestType] = useState<"SAT" | "ACT">("SAT");
  const [typeScore, setTypeScore] = useState("");
  const [toefl, setToefl] = useState("");

  const handleSubmit = async () => {
    const v = parseInt(volunteer);
    const g = parseFloat(gpa);
    const s = parseInt(typeScore);
    const t = parseInt(toefl);

    if (highschoolCompletion === null || !residencyStatus || isNaN(v) ||  isNaN(g) || isNaN(s) || isNaN(t)) {
      alert("❗ Please complete all fields");
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
    if (!isValidTOEFL(t)) {
      alert("TOEFL score must be between 0 and 120");
      return;
    }
    const inputData = {
      highschoolCompletion,
      volunteer: v,
      alumniRelation: {
        hasRelation: hasAlumniRelation,
        schoolNames: hasAlumniRelation ? alumniSchool : undefined,
      },
      residency: {
        status: residencyStatus,
        country: residencyStatus === "International" ? residencyCountry : "",
        state: residencyStatus === "Domestic" ? residencyState : "",
      },
      gpa: g,
      testType,
      typeScore: s,
      toefl: t,
      coursework: {
        english: courseCredits.english,
        math: courseCredits.math,
        science: courseCredits.science,
        scienceLab: courseCredits.scienceLab,
        language: courseCredits.language,
        social: courseCredits.social,
        arts: courseCredits.arts,
      },
    };

    try {
      const result = await uploadPersonalInfo(inputData);
      console.log("Upload successful:", result);
      onNext();
    } catch (error) {
      console.error(error);
      alert("Failed to upload personal info. Please try again.");
    }
  };

  return (
    <Backdrop onClick={(e) => e.target === e.currentTarget}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>Personal Info & Scores</Title>

        <BasicInfoSection {...{ highschoolCompletion, setHighschoolCompletion, volunteer, setVolunteer}} />
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
        <ScoreSection {...{ gpa, setGpa, testType, setTestType, typeScore, setTypeScore, toefl, setToefl }} />

        <UploadButton onClick={handleSubmit}>Submit</UploadButton>
      </ModalBox>
    </Backdrop>
  );
};

export default PersonalInfoFlowModal;
