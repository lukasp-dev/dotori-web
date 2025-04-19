"use client";

import styled from "styled-components";
import CartList from "@/components/cart/CartList";
const CartWrapper = styled.main`
  padding: 3rem;
`;

export default function CartPage() {
  return (
    <CartWrapper>
      <CartList />
    </CartWrapper>
  );
}