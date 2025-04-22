"use client";

import styled from "styled-components";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  width: 30rem;
  max-width: 600px;
  padding: 0 1rem;
`;

const CartWrapper = styled.div`
  width: 100%;
`;

const SummaryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default function CartPage() {
  return (
    <Wrapper>
      <CartWrapper>
        <CartList />
      </CartWrapper>
      <SummaryWrapper>
        <CartSummary />
      </SummaryWrapper>
    </Wrapper>
  );
}