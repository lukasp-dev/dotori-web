"use client";

import styled from "styled-components";

interface AvatarButtonProps {
    initials: string;
    onClick: () => void;
}

const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.primary};;
  color: ${({ theme }) => theme.colors.textPrimary};;
  font-weight: bold;
  font-size: 0.875rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const AvatarButton = ({ initials, onClick}: AvatarButtonProps) => {
    return <Button onClick={onClick}>{initials}</Button>;
};

export default AvatarButton;
