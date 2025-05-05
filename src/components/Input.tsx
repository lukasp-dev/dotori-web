"use client";

import styled from "styled-components";
import React from "react";

const StyledInput = styled.input`
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: white;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};
