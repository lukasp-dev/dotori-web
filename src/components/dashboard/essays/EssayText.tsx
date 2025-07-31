"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 70vh;
  align-items: center;
`;

const EssayTitle = styled.h3`
  font-family: var(--font-fredoka);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.textPrimary};
  text-align: center;
  max-width: 100%;
  word-wrap: break-word;
`;

const EssayTextarea = styled.textarea`
  flex: 1;
  width: 90%;
  font-family: var(--font-fredoka);
  font-size: 16px;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.textPrimary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 0.75rem;
  padding: 1rem;
  background-color:${(props) => props.theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}33;
  }
`;

interface EssayViewerProps {
  title: string; // essay key
  text: string;  // essay topic
}

export default function EssayViewer({ title, text }: EssayViewerProps) {
  const [value, setValue] = useState("");

  // Handle LocalStorage - 에세이 내용만 저장
  useEffect(() => {
    const saved = localStorage.getItem(`essay_content_${title}`);
    setValue(saved || "");
  }, [title]);

  // Save to LocalStorage when user types - 에세이 내용만 저장
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    localStorage.setItem(`essay_content_${title}`, newValue);
  };

  return (
    <Container>
      <EssayTitle>{text}</EssayTitle>
      <EssayTextarea 
        value={value} 
        onChange={handleChange}
        placeholder="Write your essay here..."
      />
    </Container>
  );
}
