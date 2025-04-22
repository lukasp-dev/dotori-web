"use client";

import styled from "styled-components";

const FieldGroup = styled.div<{ flex?: number }>`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
  flex: ${({ flex }) => flex || 1};
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  padding-right: 1.4rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1.5px solid #ccc;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme?.colors?.textSecondary};
  }
`;

const PaymentInputGroup = () => {
  return (
    <>
      <Row>
        <FieldGroup flex={1}>
          <Label>First Name</Label>
          <Input placeholder="John" />
        </FieldGroup>
        <FieldGroup flex={1}>
          <Label>Last Name</Label>
          <Input placeholder="Doe" />
        </FieldGroup>
      </Row>

      <Row>
        <FieldGroup flex={2}>
          <Label>Card Number</Label>
          <Input placeholder="•••• •••• •••• ••••" />
        </FieldGroup>
        <FieldGroup flex={1}>
          <Label>CVV</Label>
          <Input placeholder="123" />
        </FieldGroup>
      </Row>

      <Row>
        <FieldGroup flex={1}>
          <Label>Expiry</Label>
          <Input placeholder="MM / YY" />
        </FieldGroup>
      </Row>
    </>
  );
};

export default PaymentInputGroup;
