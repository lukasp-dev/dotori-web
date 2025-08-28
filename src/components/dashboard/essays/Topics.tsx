"use client";

import styled from "styled-components";
import { useRouter, useParams } from "next/navigation";

interface EssayListProps {
  supplementary: { [key: string]: string };
  selected: string;
  onSelectTopic: (key: string) => void;
}

interface EssayButtonProps {
    $selected?: boolean;
}

export default function EssayList({ supplementary, selected, onSelectTopic }: EssayListProps) {
  const router = useRouter();
  const params = useParams();
  const schoolId = params.school;

  const handleGoToDashboard = () => {
    router.push(`/dashboard/${schoolId}`);
  };

  return (
    <Wrapper>
      <Title>Topics</Title>

      {Object.entries(supplementary).map(([key, value], index) => (
        <EssayButton 
            key={key}
            onClick={() => onSelectTopic(key)}
            $selected={selected === key}>
          <strong>{`Supplementary Essay ${index + 1}`}</strong>
          <SubText>{value === "This school has no supplementary essays" ? value : "Click to view essay topic"}</SubText>
        </EssayButton>
      ))}

      <GoButton onClick={handleGoToDashboard}>go to dashboard</GoButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 70vh;
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Title = styled.h3`
  font-family: var(--font-fredoka);
  font-size: 22px;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const EssayButton = styled.div<EssayButtonProps>`
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
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.lightGreen : "#fff"};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightGreen};
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 15px;
  }
`;

const SubText = styled.div`
  font-family: var(--font-fredoka);
  font-size: 14px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 6px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const GoButton = styled.button`
  margin-top: 2rem;
  align-self: center;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-family: var(--font-fredoka);
  font-size: 16px;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.textPrimary};
  }
`;