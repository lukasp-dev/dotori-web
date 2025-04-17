"use client";

import styled from "styled-components";
import { useState } from "react";
import {isValidGPA, isValidSAT, isValidACT, isValidTOEFL} from "@/utils/scoreValidator";

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
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-top: 1rem;
  text-align: left;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.colors.textSecondary};
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 20%;
  height: 3rem;
  padding: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.colors.textSecondary};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  display: block;
  margin-left: 1rem
`;

const UploadButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
`;

interface ScoreModalProps {
  title: string;
  description: string;
  onClose: () => void;
  onUpload?: (score: {
    gpa: number;
    testType: "SAT" | "ACT";
    typeScore: number;
    toefl: number;
  }) => void;
}

const ScoreModal = ({
  title,
  description,
  onClose,
  onUpload,
}: ScoreModalProps) => {
  const [gpa, setGpa] = useState("");
  const [testType, setType] = useState<"SAT" | "ACT">("SAT");
  const [typeScore, setTypeScore] = useState("");
  const [toefl, setToefl] = useState("");

  const handleSubmit = () => {
    const g = parseFloat(gpa);
    const sa = parseInt(typeScore);
    const t = parseInt(toefl);
    if (isNaN(g) || isNaN(sa) || isNaN(t)) {
        alert("❗ Please fill up the fields")
        return;
    }
    if (!isValidGPA(g)) {
        alert("GPA must be between 0.0 and 4.0");
        return;
    }
    if (testType === "SAT" && !isValidSAT(sa)) {
        alert("SAT score must be between 400 and 1600");
        return;
    }
    if (testType === "ACT" && !isValidACT(sa)) {
        alert("ACT score must be between 1 and 36");
        return;
    }
    if (!isValidTOEFL(t)) {
        alert("TOEFL score must be between 0 and 120");
        return;
    }
    onUpload?.({
        gpa: g, 
        testType, 
        typeScore: sa, 
        toefl: t
    });
    onClose();
  };

  return (
   <Backdrop onClick={(e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
   }}>
    <ModalBox onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>x</Close>
        <h2>{title}</h2>
        <p>{description}</p>

        <Label>🎓 GPA</Label>
        <Input
          type="number"
          step="0.01"
          placeholder="e.g. 4.00"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />

        <Label>🧠 Test Type</Label>
        <Select value={testType} onChange={(e) => setType(e.target.value as "SAT" | "ACT")}>
          <option value="SAT">SAT</option>
          <option value="ACT">ACT</option>
        </Select>

        <Label>📊 {testType} Score</Label>
        <Input
          type="number"
          placeholder={testType === "SAT" ? "e.g. 1250" : "e.g. 34"}
          value={typeScore}
          onChange={(e) => setTypeScore(e.target.value)}
        />

        <Label>🗣 TOEFL</Label>
        <Input
          type="number"
          placeholder="e.g. 110"
          value={toefl}
          onChange={(e) => setToefl(e.target.value)}
        />
        <UploadButton onClick={handleSubmit}>Upload</UploadButton>
    </ModalBox>
   </Backdrop>
  );
};

export default ScoreModal;
