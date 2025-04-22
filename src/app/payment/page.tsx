"use client";

import CardPaymentForm from "@/components/common/payment/CardPaymentForm";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  padding: 2rem;
`;

export default function PaymentPage() {
  return(
    <Wrapper>
        <CardPaymentForm/>
    </Wrapper>
  );
}
