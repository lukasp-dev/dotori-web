import Select from "react-select";

const schoolOptions = [
  { label: "Georgia Tech", value: "Georgia Tech" },
  { label: "NYU", value: "NYU" },
  { label: "University of Minnesota", value: "University of Minnesota" },
  { label: "U Georgia", value: "U Georgia" },
];

interface SchoolSelectProps {
  onSelect: (schools: string[]) => void;
  selectedSchools: string[];
}

const SchoolSelect = ({ onSelect, selectedSchools }: SchoolSelectProps) => {
  const selectedOptions = schoolOptions.filter(opt =>
    selectedSchools.includes(opt.value)
  );

  return (
    <Select
      isMulti
      options={schoolOptions}
      value={selectedOptions}
      onChange={(selectedOptions) => {
        const values = selectedOptions.map(opt => opt.value);
        onSelect(values); 
      }}
      placeholder="Select schools..."
    />
  );
};

export default SchoolSelect;
