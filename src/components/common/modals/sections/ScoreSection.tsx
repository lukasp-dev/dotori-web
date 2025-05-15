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

interface ScoreSectionProps {
  gpa: string;
  setGpa: (v: string) => void;
  testType: "SAT" | "ACT";
  setTestType: (v: "SAT" | "ACT") => void;
  typeScore: string;
  setTypeScore: (v: string) => void;
}

const ScoreSection = ({
  gpa,
  setGpa,
  testType,
  setTestType,
  typeScore,
  setTypeScore,
}: ScoreSectionProps) => {
  return (
    <>
      <Label>HighSchool GPA</Label>
      <Input
        type="number"
        step="0.01"
        placeholder="e.g. 4.00"
        value={gpa}
        onChange={(e) => setGpa(e.target.value)}
      />

      <Label>Test Type(SAT / ACT)</Label>
      <ButtonGroup>
        <OptionButton selected={testType === "SAT"} onClick={() => setTestType("SAT")}>SAT</OptionButton>
        <OptionButton selected={testType === "ACT"} onClick={() => setTestType("ACT")}>ACT</OptionButton>
      </ButtonGroup>

      <Label>{testType} Score</Label>
      <Input
        type="number"
        placeholder={testType === "SAT" ? "e.g. 1250" : "e.g. 34"}
        value={typeScore}
        onChange={(e) => setTypeScore(e.target.value)}
      />
    </>
  );
};

export default ScoreSection;