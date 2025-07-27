"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { initProgress } from "@/store/dashboard/progressSlice";

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #eee;
  margin: 2rem 0;
  max-width: 40rem;
  width: 100%;
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const PurchaseButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.textPrimary};
  }
`;

const CartSummary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const handleConfirm = () => {
    dispatch(
      initProgress(
        cartItems.map((school) => ({
          id: school.id,
          userId: school.userId,
          school_name: school.school_name,
        }))
      )
    );

    localStorage.setItem("recommendCompleted", "true");
    localStorage.setItem("cartCompleted", "true");
    router.push("/");
  };

  return (
    <SummaryWrapper>
      <Divider />
      <PurchaseButton onClick={handleConfirm}>
        Confirm
      </PurchaseButton>
    </SummaryWrapper>
  );
};
export default CartSummary;
