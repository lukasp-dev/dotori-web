"use client";

import styled from "styled-components";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 7rem auto 1rem auto;
  width: 30rem;
  max-width: 600px;
  padding: 0 1rem;
`;

const TitleRow = styled.div`
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
      <TitleRow>
        <CartList />
      </TitleRow>
      <SummaryWrapper>
        <CartSummary />
      </SummaryWrapper>
    </Wrapper>
  );
}