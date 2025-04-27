import styled from "styled-components";

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-top: 1rem;
  text-align: left;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0 1rem 0;
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

interface BasicInfoSectionProps {
  highschoolCompletion: boolean | null;
  setHighschoolCompletion: (v: boolean) => void;
  volunteer: string;
  setVolunteer: (v: string) => void;
}

const BasicInfoSection = ({
  highschoolCompletion,
  setHighschoolCompletion,
  volunteer,
  setVolunteer,
}: BasicInfoSectionProps) => {
  return (
    <>
      <Label>High School Completion (Expected)</Label>
      <ButtonGroup>
        <OptionButton selected={highschoolCompletion === true} onClick={() => setHighschoolCompletion(true)}>Yes</OptionButton>
        <OptionButton selected={highschoolCompletion === false} onClick={() => setHighschoolCompletion(false)}>No</OptionButton>
      </ButtonGroup>

      <Label>Volunteering Hours</Label>
      <Input
        type="number"
        placeholder="e.g. 100"
        value={volunteer}
        onChange={(e) => setVolunteer(e.target.value)}
      />
    </>
  );
};

export default BasicInfoSection;
