"use client";

import styled from "styled-components";
import { useSelector } from "react-redux";

const TotalDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: right;
`;

const PaymentTotal = () => {
  const total = useSelector((state: any) => state.cart.total ?? 0);
  return <TotalDisplay>$ {total.toFixed(2)} USD</TotalDisplay>;
};

export default PaymentTotal;
