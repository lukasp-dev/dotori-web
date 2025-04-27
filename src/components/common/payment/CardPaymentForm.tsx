"use client";

import styled from "styled-components";
import PaymentTotal from "./PaymentTotal";
import PaymentInputGroup from "./PaymentInputGroup";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { initProgress } from "@/store/dashboard/progressSlice";

const Container = styled.div`
  width: 30rem;
  gap: 5rem;
  align-items: center;
  jestify-content: center;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

const SubmitButton = styled.button`
  width: 100%;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.textPrimary};
  }
`;

const CardPaymentForm = () => {
  const router = useRouter(); // ✅ 선언
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleSubmit = () => {
    // 가짜 결제 처리105
    localStorage.setItem("fromPayment", "true");
    const defaultSteps = {
      ResumeOutline: true,
      FirstDraft: true,
      AiFeedback: true,
      RequestedHumanize: true,
      Humanized: false,
      Submitted: false,
    };
  
    dispatch(
      initProgress(
        cartItems.map((school) => ({
          id: school.id,
          name: school.name,
          steps: { ...defaultSteps },
        }))
      )
    );

    console.log("✅ progress initialized");
  
    router.push("/");
  };

  return (
    <Container>
      <PaymentTotal />
      <PaymentInputGroup />
      <SubmitButton onClick={handleSubmit}>SUBMIT PAYMENT</SubmitButton>
    </Container>
  );
};

export default CardPaymentForm;
