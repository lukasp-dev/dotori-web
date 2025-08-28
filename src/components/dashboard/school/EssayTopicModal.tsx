"use client";

import styled from "styled-components";
import { useState } from "react";

interface EssayTopicModalProps {
  essayKey: string;
  essayTopic: string;
  groupEssays: any[];
  onClose: () => void;
}

interface EssayOption {
  id: string;
  topic: string;
}

export default function EssayTopicModal({ essayKey, essayTopic, groupEssays, onClose }: EssayTopicModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
  // check group essay
  const isChoiceBased = essayKey.startsWith('group-');
  
  // Get topics from group essay
  const essayOptions: EssayOption[] = isChoiceBased ? 
    (() => {
      const groupIndex = parseInt(essayKey.split('-')[1]);
      const group = groupEssays[groupIndex];
      return group?.essays?.map((essay: any, index: number) => ({
        id: index.toString(),
        topic: essay.topic
      })) || [];
    })() : [];

  const maxChoices = isChoiceBased ? 
    (() => {
      const groupIndex = parseInt(essayKey.split('-')[1]);
      const group = groupEssays[groupIndex];
      return group?.choiceCount || 1;
    })() : 1;

  const handleOptionChange = (optionId: string) => {
    if (isChoiceBased) {
      setSelectedOptions(prev => {
        if (prev.includes(optionId)) {
          return prev.filter(id => id !== optionId);
        } else {
          if (prev.length < maxChoices) {
            return [...prev, optionId];
          }
          return prev;
        }
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <ModalContent>
        <ModalHeader>
          <Title>
            {isChoiceBased ? `Choice-based Essay (${maxChoices}/${essayOptions.length})` : "Essay Topic"}
          </Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        

        
        <ModalBody>
          {isChoiceBased ? (
            <ChoiceBasedContent>
              <Instruction>
                Please select {maxChoices} topic(s) from the options below:
              </Instruction>
              {essayOptions.map((option) => (
                <OptionContainer key={option.id}>
                  <RadioInput
                    type="checkbox"
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionChange(option.id)}
                  />
                  <OptionLabel htmlFor={option.id}>
                    {option.topic}
                  </OptionLabel>
                </OptionContainer>
              ))}
              <SelectionInfo>
                Selected: {selectedOptions.length}/{maxChoices}
              </SelectionInfo>
              <ConfirmButton 
                onClick={onClose}
                disabled={selectedOptions.length === 0}
              >
                Confirm Selection
              </ConfirmButton>
            </ChoiceBasedContent>
          ) : (
            <RegularContent>
              <TopicText>{essayTopic}</TopicText>
            </RegularContent>
          )}
        </ModalBody>
      </ModalContent>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-family: var(--font-fredoka);
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.textSecondary};
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;

const ModalBody = styled.div`
  font-family: var(--font-fredoka);
`;

const ChoiceBasedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Instruction = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.lightGreen};
  }
`;

const RadioInput = styled.input`
  margin-top: 0.25rem;
`;

const OptionLabel = styled.label`
  font-size: 0.9rem;
  line-height: 1.4;
  color: ${(props) => props.theme.colors.textPrimary};
  cursor: pointer;
  flex: 1;
`;

const SelectionInfo = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.lightGreen};
  border-radius: 6px;
`;

const ConfirmButton = styled.button`
  background-color: ${(props) => props.theme.colors.textPrimary};
  color: white;
  font-family: var(--font-fredoka);
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  align-self: center;
  
  &:hover:not(:disabled) {
    background-color: #3b2d1d;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RegularContent = styled.div`
  padding: 1rem 0;
`;

const TopicText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0;
`; 