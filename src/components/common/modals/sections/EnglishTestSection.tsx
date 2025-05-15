import styled from "styled-components";

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-top: 1rem;
  text-align: left;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const Input = styled.input`
  width: 95%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.colors.textSecondary};
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0 1rem 0;
`;

const OptionButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 0.5rem;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.white};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.textPrimary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

interface EnglishTestSectionProps {
  testType: "TOEFL" | "IELTS" | "Duolingo";
  setTestType: (type: "TOEFL" | "IELTS" | "Duolingo") => void;
  typeScore: string;
  setTypeScore: (score: string) => void;
  residencyStatus: "" | "Domestic" | "International";
}

const EnglishTestSection = ({
    typeScore,
    setTypeScore,
    testType,
    setTestType,
    residencyStatus, // 👈 이거 꼭 props로 받아야 함!
  }: EnglishTestSectionProps) => {
    if (residencyStatus !== "International") return null;
  
    return (
      <>
        <Label>English Proficiency Test (TOEFL / IELTS / Duolingo)</Label>
        <ButtonGroup>
          <OptionButton selected={testType === "TOEFL"} onClick={() => setTestType("TOEFL")}>TOEFL</OptionButton>
          <OptionButton selected={testType === "IELTS"} onClick={() => setTestType("IELTS")}>IELTS</OptionButton>
          <OptionButton selected={testType === "Duolingo"} onClick={() => setTestType("Duolingo")}>Duolingo</OptionButton>
        </ButtonGroup>
  
        <Label>{testType} Score</Label>
        <Input
          type="number"
          placeholder={
            testType === "TOEFL" ? "e.g. 120" :
            testType === "IELTS" ? "e.g. 9.0" :
            "e.g. 160"
          }
          value={typeScore}
          onChange={(e) => setTypeScore(e.target.value)}
        />
      </>
    );
  };

export default EnglishTestSection;