"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatTitle } from "@/utils/essayTopics";

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
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.textPrimary};
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
  title: string; // ex: "common_app", "supplementary_0"
  text: string;  // prompt
}

export default function EssayViewer({ title, text }: EssayViewerProps) {
  const [value, setValue] = useState("");

  // Handle LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(`essay_${title}`);
    setValue(saved || text + "'s Essay");
  }, [title, text]);

  // Save to LocalStorage when user types
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    localStorage.setItem(`essay_${title}`, newValue);
  };

  return (
    <Container>
      <EssayTitle>{formatTitle(title)}</EssayTitle>
      <EssayTextarea value={value} onChange={handleChange} />
    </Container>
  );
}
