"use client";

import styled from "styled-components";

interface EssayListProps {
  commonApp: string;
  supplementary: { [key: string]: string };
}

export default function EssayList({ commonApp, supplementary }: EssayListProps) {
  return (
    <Wrapper>
      <Title>Essays</Title>
      <EssayButton>
        <strong>Common App Essay</strong>
        <SubText>{commonApp || "Obstacle or Challenge"}</SubText>
      </EssayButton>

      {Object.entries(supplementary).map(([key, value], index) => (
        <EssayButton key={key}>
          <strong>{`Supplementary Essay ${index + 1}`}</strong>
          <SubText>{value || "Optional Prompt"}</SubText>
        </EssayButton>
      ))}

      <GoButton>go to essay</GoButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  padding: 1.5rem 1.5rem 0.8rem 1.5rem;
  border-radius: 1rem;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h3`
  font-family: var(--font-fredoka);
  font-size: 22px;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const EssayButton = styled.div`
  font-family: var(--font-fredoka);
  font-size: 20px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid ${(props) => props.theme.colors.textPrimary};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  background-color: #fff;
  transition: all 0.2s ease;
`;

const SubText = styled.div`
  font-family: var(--font-fredoka);
  font-size: 14px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 6px;
`;

const GoButton = styled.button`
  margin-top: 2rem;
  align-self: center;
  background-color: #4e3b26;
  color: white;
  font-family: var(--font-fredoka);
  font-size: 16px;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #3b2d1d;
  }
`;
