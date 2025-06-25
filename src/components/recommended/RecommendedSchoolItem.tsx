import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { RootState } from "@/store";

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem auto;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 40rem;
  box-sizing: border-box;
  padding: 1rem 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SchoolWrapper = styled.h2`
  margin: 0;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ScoreWrapper = styled.p`
  margin: 0.25rem 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Label = styled.span<{ color: string }>`
  margin-left: 0.5rem;
  color: ${(props) => props.color};
  font-weight: bold;
`;

const AddButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "added"
})<{ added: boolean }>`
  background-color: ${({ added, theme }) =>
    added ? theme.colors.textPrimary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 8rem;
  text-align: center;
  white-space: nowrap;
  &:hover {
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
`;

interface Props {
  school: {
    id: number;
    userId: string;
    school_name: string;
    score: number;
  };
}

const RecommendedSchoolItem = ({ school }: Props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === school.id);

  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(school.id));
    } else {
      dispatch(addToCart(school));
    }
  };

  const getCategory = (score: number) => {
    if (score >= 70) return { label: "Safety", color: "#b0c36d" };
    if (score >= 60) return { label: "Reach", color: "#59421a" };
    if (score >= 40) return { label: "Sub-Target", color: "#FFA07A" };
    return { label: "Target", color: "#F08080" };
  };

  const { label, color } = getCategory(school.score);

  return (
    <Card>
      <ContentWrapper>
        <Info>
          <SchoolWrapper>{school.school_name}</SchoolWrapper>
          <ScoreWrapper>
            Score: {school.score} <Label color={color}>{label}</Label>
          </ScoreWrapper>
        </Info>
        <AddButton added={isInCart} onClick={handleClick}>
          {isInCart ? "✅ Added" : "Backpacking"}
        </AddButton>
      </ContentWrapper>
    </Card>
  );
};

export default RecommendedSchoolItem;