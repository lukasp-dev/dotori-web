"use client";

import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";

const StyledButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary || "#2563eb"};
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...props }: PrimaryButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
