"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import Topics from "@/components/dashboard/essays/Topics";
import EssayText from "@/components/dashboard/essays/EssayText";
import { formatTitle } from "@/utils/essayTopics";
import ChatBox from "@/components/dashboard/essays/ChatBox";
import { useParams } from "next/navigation";
import { fetchSchoolById } from "@/utils/fetchSchoolById";
import { fetchEssayTopics } from "@/utils/fetchEssayTopics";

export default function EssayPage() {
  const params = useParams();
  const schoolId = Number(params.school);
  const [school, setSchool] = useState<any | null>(null);
  const [essayTopics, setEssayTopics] = useState<any | null>(null);
  const [selected, setSelected] = useState("0");

  useEffect(() => {
    if (!schoolId) return;
    
    // 학교 기본 정보 가져오기 (mock data)
    fetchSchoolById(schoolId)
      .then(setSchool)
      .catch(() => setSchool(null));
    
    // 에세이 토픽 가져오기 (API)
    fetchEssayTopics(schoolId)
      .then(setEssayTopics)
      .catch(() => setEssayTopics(null));
  }, [schoolId]);

  if (!school) return <div>Loading...</div>;

  return (
    <PageContainer>
      <TitleStyle>{school.name}</TitleStyle>
      <Container>
        <LeftColumn>
          <Topics
            supplementary={essayTopics?.supplementary || school.essays.supplementary}
            selected={selected}
            onSelectTopic={setSelected}
          />
        </LeftColumn>
        <CenterColumn>
          <EssayText 
            title={selected} 
            text={essayTopics?.supplementary?.[selected] || formatTitle(selected)} 
          />
        </CenterColumn>
        <RightColumn>
          <ChatBox />
        </RightColumn>
      </Container>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.textPrimary};
  min-height: 100vh;
  padding-top: 80px;
`;

const TitleStyle = styled.h2`
  font-family: var(--font-fredoka);
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  min-height: 600px;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.textPrimary};
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 0;
    min-height: 150px;
  }
`;

const CenterColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    flex: 1;
    min-height: 400px; // 또는 height: auto; + grow
  }
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 0;
    min-height: 150px;
  }
`;
