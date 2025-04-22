import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";

interface Props {
  id: number;
  name: string;
  price: number;
}

const CartItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0 auto 1rem auto;   
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const SchoolName = styled.h2`
  margin: 0;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Price = styled.p`
  margin: 0.25rem 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RemoveButton = styled.button`
  background: none;
  color: red;
  border: none;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CartItem = ({ id, name, price }: Props) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };
  return (
    <CartItemWrapper>
      <Info>
        <SchoolName>{name}</SchoolName>
        <Price>${price}</Price>
      </Info>
      <RemoveButton onClick={handleRemove}>Delete</RemoveButton>
    </CartItemWrapper>
  );
};

export default CartItem;