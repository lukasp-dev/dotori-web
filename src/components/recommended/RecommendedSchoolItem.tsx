import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { RootState } from "@/store";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 1.5rem;
  margin: 0.75rem 0;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Info = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const SchoolWrapper = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const PriceWrapper = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AddButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "added"
})< { added: boolean } >`
  background-color: ${({ added, theme }) =>
    added ? theme.colors.textSecondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 8rem;

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
  
const RecommendedSchoolItem = ({ school}: Props) => {
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

  return (
    <Card>
      <Info>
        <SchoolWrapper>{school.name}</SchoolWrapper>
        <PriceWrapper>${school.price}</PriceWrapper>
      </Info>
      <AddButton added={isInCart} onClick={handleClick}>
        {isInCart ? "✅ Added" : "🎒 Backpacking"}
      </AddButton>
    </Card>
  );
}
export default RecommendedSchoolItem;