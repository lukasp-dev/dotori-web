"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import UploadModal from "@/components/common/UploadModal";

const PromptWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 1.5rem;
  border-left: 4px solid ${(props) => props.theme.colors.primary}; 
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-width: 40rem;
  margin: 5rem auto;
  text-align: center;
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
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
`;

interface UploadPromptProps {
  title: string;
  message: string;
  buttonLabel?: string;
  uploadConfig: {
    modalTitle: string;
    description: string;
    accept?: string;
    onUpload: (file: File) => void;
  };
}

const UploadPrompt = ({
  title,
  message,
  buttonLabel = "Upload",
  uploadConfig,
}: UploadPromptProps) => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  if (status === "loading" || !session) return null;

  const handleUpload = (file: File) => {
    uploadConfig.onUpload(file);
    setShowModal(false);
  };

  return (
    <>
      <PromptWrapper>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
        <UploadButton onClick={() => setShowModal(true)}>
          {buttonLabel}
        </UploadButton>
      </PromptWrapper>

      {showModal && (
        <UploadModal
          title={uploadConfig.modalTitle}
          description={uploadConfig.description}
          accept={uploadConfig.accept}
          onClose={() => setShowModal(false)}
          onUpload={handleUpload}
        />
      )}
    </>
  );
};

export default UploadPrompt;
