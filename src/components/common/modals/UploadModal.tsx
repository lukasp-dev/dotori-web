"use client";

import styled from "styled-components";
import { useState } from "react";
import { uploadResume } from "@/app/api/auth/uploadResume";
import { getUserId } from "@/lib/auth/user";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 1rem;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Close = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textPrimary};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const UploadLabel = styled.label`
  display: block;
  border: 2px dashed ${(props) => props.theme.colors.textPrimary};
  padding: 2rem;
  border-radius: 1rem;
  margin: 1.5rem 0;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background-color: ${(props) => props.theme.colors.textPrimary};
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

interface UploadModalProps {
  title: string;
  description: string;
  accept?: string;
  onClose: () => void;
  onUpload?: (file: File) => void;
}

const UploadModal = ({
  title,
  description,
  accept = ".pdf,.doc,.docx",
  onClose,
  onUpload,
}: UploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("📄 Please select the file first.");
      return;
    }
  
    try {
      console.log('UploadModal: Selected file:', selectedFile);
      console.log('UploadModal: Calling onUpload callback');
      onUpload?.(selectedFile);
      console.log('UploadModal: onUpload callback completed');
      onClose();
    } catch (err: any) {
      console.error('UploadModal: Error in handleUpload:', err);
      alert("❌ Upload failed: " + err.message);
    }
  };  

  return (
    <Backdrop onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
     }}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>x</Close>
        <h2>{title}</h2>
        <p>{description}</p>
        {selectedFile && (
          <p
            style={{
              fontSize: "0.95rem",
              color: "#666",
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            📎 Selected: {selectedFile.name}
          </p>
        )}
        <UploadLabel htmlFor="file-upload">
          📄 Click or drag file to upload
          <br />
          <small>Accepted: {accept}</small>
        </UploadLabel>
        <HiddenInput
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleFileChange}
        />
        <UploadButton onClick={handleUpload}>
          Upload
        </UploadButton>
      </ModalBox>
    </Backdrop>
  );
};

export default UploadModal;
