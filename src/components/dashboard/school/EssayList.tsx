"use client";

import styled from "styled-components";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import EssayTopicModal from "@/components/dashboard/school/EssayTopicModal";

interface EssayListProps {
  supplementary: { [key: string]: string };
  groupEssays?: any[];
}

export default function EssayList({ supplementary, groupEssays = [] }: EssayListProps) {
  const router = useRouter();
  const params = useParams();
  const schoolId = params.school;
  const [selectedEssay, setSelectedEssay] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoEssay = () => {
    router.push(`/dashboard/${schoolId}/essay`);
  };

  const handleEssayClick = (key: string) => {
    setSelectedEssay(key);
    setIsModalOpen(true);
  };

  const getEssayTopic = (key: string) => {
    // Conditional check for group essay
    if (key.startsWith('group-')) {
      const groupIndex = parseInt(key.split('-')[1]);
      const group = groupEssays[groupIndex];
      if (group && group.essays && group.essays.length > 0) {
        return group.essays.map((essay: any, index: number) => 
          `Essay ${index + 1}: ${essay.topic}`
        ).join('\n\n');
      }
    }
    // Supplementary essay
    return supplementary[key];
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEssay(null);
  };

  return (
    <Wrapper>
      <Title>Essays</Title>

      {/* Supplementary Essays */}
      {Object.entries(supplementary).map(([key, value], index) => (
        <EssayButton 
          key={key} 
          onClick={() => handleEssayClick(key)}
          $clickable={value !== "This school has no supplementary essays"}
        >
          <strong>{`Supplementary Essay ${index + 1}`}</strong>
          <SubText>{value === "This school has no supplementary essays" ? value : "Click to view essay topic"}</SubText>
        </EssayButton>
      ))}

      {/* Group Essays */}
      {groupEssays && groupEssays.length > 0 && groupEssays.map((group: any, groupIndex: number) => (
        <EssayButton 
          key={`group-${groupIndex}`}
          onClick={() => handleEssayClick(`group-${groupIndex}`)}
          $clickable={true}
        >
          <strong>Choice-based Essay</strong>
          <SubText>Click to view essay topics</SubText>
        </EssayButton>
      ))}

      <GoButton onClick={handleGoEssay}>go to essay</GoButton>

      {isModalOpen && selectedEssay && (
        <EssayTopicModal
          essayKey={selectedEssay}
          essayTopic={getEssayTopic(selectedEssay)}
          groupEssays={groupEssays}
          onClose={handleCloseModal}

        />
      )}
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

const EssayButton = styled.div<{ $clickable: boolean }>`
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
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  
  ${props => props.$clickable && `
    &:hover {
      background-color: ${props.theme.colors.lightGreen};
      transform: translateY(-2px);
    }
  `}
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
