"use client";

import styled from "styled-components";
import PaymentTotal from "./PaymentTotal";
import PaymentInputGroup from "./PaymentInputGroup";

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
`;

const CardPaymentForm = () => {
  return (
    <Container>
      <PaymentTotal />
      <PaymentInputGroup />
      <SubmitButton>SUBMIT PAYMENT</SubmitButton>
    </Container>
  );
};

export default CardPaymentForm;
