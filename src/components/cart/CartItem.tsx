"use client";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";

interface Props {
  school: {
    userId: string;
    school_name: string;
    score: number;
  };
}

const CartItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem auto;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 40rem;
  box-sizing: border-box;
  padding: 1rem 1.5rem;
  justify-content: space-between;
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

const CartItem = ({ school }: Props) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(school.school_name));
  };
  return (
    <CartItemWrapper>
      <Info>
        <SchoolName>{school.school_name}</SchoolName>
      </Info>
      <RemoveButton onClick={handleRemove}>Delete</RemoveButton>
    </CartItemWrapper>
  );
};

export default CartItem;
