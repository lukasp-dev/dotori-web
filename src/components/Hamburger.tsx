"use client";

import styled from "styled-components";

const HamburgerWrapper = styled.button<{ open: boolean }>`
  all: unset;
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  @media (max-width: 640px) {
    display: flex;
  }

  div {
    height: 1.5px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: 0.2s;
  }

  ${({ open }) =>
    open &&
    `
    div:nth-child(1) {
      transform: rotate(45deg) translate(2px, 2px);
    }
    div:nth-child(2) {
      opacity: 0;
    }
    div:nth-child(3) {
      transform: rotate(-45deg) translate(2px, -2px);
    }
  `}
`;

interface HamburgerProps {
  open: boolean;
  onClick: () => void;
}

const Hamburger = ({ open, onClick }: HamburgerProps) => {
  return (
    <HamburgerWrapper onClick={onClick} open={open}>
      <div />
      <div />
      <div />
    </HamburgerWrapper>
  );
};

export default Hamburger;
