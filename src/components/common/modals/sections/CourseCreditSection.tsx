import styled from "styled-components";

const SectionWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Select = styled.select`
  width: 100%;
  padding: 0.35rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #ccc;
  font-size: 0.9rem;
`;

interface CourseCredits {
  english: number;
  math: number;
  science: number;
  scienceLab: number;
  language: number;
  social: number;
  arts: number;
}

interface Props {
  courseCredits: CourseCredits;
  setCourseCredits: (credits: CourseCredits) => void;
}

const CourseCreditSection = ({ courseCredits, setCourseCredits }: Props) => {
  const handleChange = (field: keyof CourseCredits, value: number) => {
    setCourseCredits({ ...courseCredits, [field]: value });
  };

  const subjects: { label: string; field: keyof CourseCredits }[] = [
    { label: "English", field: "english" },
    { label: "Math", field: "math" },
    { label: "Science", field: "science" },
    { label: "Science with Lab", field: "scienceLab" },
    { label: "Foreign Language", field: "language" },
    { label: "Social Studies", field: "social" },
    { label: "Visual/Performing Arts", field: "arts" },
  ];

  return (
    <SectionWrapper>
      <SectionTitle>High School Coursework</SectionTitle>
      <GridWrapper>
        {subjects.map(({ label, field }) => (
          <div key={field}>
            <Label>{label}</Label>
            <Select
              value={courseCredits[field]}
              onChange={(e) => handleChange(field, parseInt(e.target.value))}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                <option key={val} value={val}>
                  {val} credit{val > 1 ? "s" : ""}
                </option>
              ))}
            </Select>
          </div>
        ))}
      </GridWrapper>
    </SectionWrapper>
  );
};

export default CourseCreditSection;