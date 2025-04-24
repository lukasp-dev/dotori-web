"use client";

import styled from "styled-components";

interface UploadPromptProps {
  title: string;
  message: string;
  buttonLabel: string;
  onClick: () => void;
}

const PromptWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 1.5rem;
  border-left: 4px solid ${(props) => props.theme.colors.textSecondary};
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  max-width: 40rem;
  max-height: 40rem;
  margin: 5rem auto 5rem auto;
  text-align: center;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const UploadButton = styled.button`
  background-color: ${(props) => props.theme.colors.textSecondary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const UploadPrompt = ({ title, message, buttonLabel, onClick }: UploadPromptProps) => {
  return (
    <PromptWrapper>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <UploadButton onClick={onClick}>{buttonLabel}</UploadButton>
    </PromptWrapper>
  );
};

export default UploadPrompt;
