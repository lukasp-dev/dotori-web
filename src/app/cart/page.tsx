"use client";

import styled from "styled-components";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";

const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  padding: 6rem 0 10rem 0;
`;

const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
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