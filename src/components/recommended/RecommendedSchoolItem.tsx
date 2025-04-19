import styled from "styled-components";

const Wrapper = styled.div`
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0,05);
`;

const SchoolWrapper = styled.h2`
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const PriceWrapper = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const AddButton = styled.button`
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

interface Props {
    school: {
      id: number;
      name: string;
      price: number;
    };
    onAdd: () => void;
  }
  
const RecommendedSchoolItem = ({ school, onAdd }: Props) => {
    return (
      <Wrapper>
        <SchoolWrapper>{school.name}</SchoolWrapper>
        <PriceWrapper >${school.price}</PriceWrapper>
        <AddButton onClick={onAdd}>
          Add to Backpack
        </AddButton>
      </Wrapper>
    );
  }
export default RecommendedSchoolItem;