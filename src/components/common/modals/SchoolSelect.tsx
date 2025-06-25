import Select from "react-select";
import axios from "axios";
import { useEffect, useState } from "react";

interface SchoolSelectProps {
  onSelect: (schoolId: number[]) => void;
  selectedSchools: number[];
}
interface School {
  label: string;
  value: number;
}

const SchoolSelect = ({ onSelect, selectedSchools }: SchoolSelectProps) => {
  const [schoolOptions, setSchoolOptions] = useState<School[]>([]);
  
  useEffect(() => {
    axios.get("http://localhost:8080/api/schools") // Need to be changed to the actual API endpoint
      .then((response) => {
        const options = response.data.map((school: any) => ({
          label: school.label,
          value: school.value
        }));
        setSchoolOptions(options);
      })
      .catch((error) => console.error("Error fetching schools:", error));
    }, []);

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
