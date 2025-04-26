import styled from "styled-components";
import Select from "react-select";
import countryList from "react-select-country-list";
import StateSelect from "../StateSelect";

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

interface ResidencySectionProps {
  residencyStatus: "US" | "Non-US" | "";
  setResidencyStatus: (s: "US" | "Non-US") => void;
  residencyCountry: string;
  setResidencyState: (s: string) => void;
  setResidencyCountry: (c: string) => void;
}

const ResidencySection = ({
  residencyStatus,
  setResidencyStatus,
  setResidencyState,
  setResidencyCountry,
}: ResidencySectionProps) => {
  const countryOptions = countryList().getData();

  return (
    <>
      <Label>Residency</Label>
      <ButtonGroup>
        <OptionButton selected={residencyStatus === "US"} onClick={() => setResidencyStatus("US")}>US</OptionButton>
        <OptionButton selected={residencyStatus === "Non-US"} onClick={() => setResidencyStatus("Non-US")}>Non-US</OptionButton>
      </ButtonGroup>
      {residencyStatus === "US" && (
        <StateSelect onSelect={setResidencyState} />
      )}
      {residencyStatus === "Non-US" && (
        <div style={{ marginBottom: "1rem" }}>
          <Select
            options={countryOptions}
            onChange={(option) => setResidencyCountry(option?.label || "")}
            placeholder="Select country..."
          />
        </div>
      )}
    </>
  );
};

export default ResidencySection;