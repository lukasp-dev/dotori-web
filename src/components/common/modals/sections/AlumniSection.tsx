import styled from "styled-components";
import SchoolSelect from "@/components/common/modals/SchoolSelect"; // react-select 기반 컴포넌트

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

interface AlumniSectionProps {
  hasAlumniRelation: boolean | null;
  setHasAlumniRelation: (b: boolean) => void;
  alumniSchool: number;
  setAlumniSchool: (id: number) => void;
}

const AlumniSection = ({
  hasAlumniRelation,
  setHasAlumniRelation,
  alumniSchool,
  setAlumniSchool,
}: AlumniSectionProps) => {
  const handleSelect = (schoolId: number[]) => {
    // 첫 번째 선택된 학교의 ID만 사용
    setAlumniSchool(schoolId.length > 0 ? schoolId[0] : 0);
  };

  return (
    <>
      <Label>Alumni Relation</Label>
      <ButtonGroup>
        <OptionButton
          selected={hasAlumniRelation === true}
          onClick={() => setHasAlumniRelation(true)}
        >
          Yes
        </OptionButton>
        <OptionButton
          selected={hasAlumniRelation === false}
          onClick={() => setHasAlumniRelation(false)}
        >
          No
        </OptionButton>
      </ButtonGroup>

      {hasAlumniRelation === true && (
        <SchoolSelect
          onSelect={handleSelect}
          selectedSchools={alumniSchool > 0 ? [alumniSchool] : []}
        />
      )}
    </>
  );
};

export default AlumniSection;
