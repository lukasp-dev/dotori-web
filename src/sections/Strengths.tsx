"use client";

import styled from "styled-components";
import InfoCard from "@/components/common/Card";
import images from "@/constants/images.json";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TopCard = styled.div`
  grid-column: span 3;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
  row-gap: 0;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-column: span 1;
    row-gap: 2rem;
  }
`;

export default function Strengths() {
  return (
    <Container>
      <TopCard>
        <InfoCard
          title="Explore schools smarter"
          description="Use data to find what really fits you."
          imageUrl={images["data_icon"]}
        />
        <InfoCard
          title="Ideas in seconds"
          description="Your personal AI brainstorming buddy!"
          imageUrl={images["essay_icon"]}
        />
      </TopCard>
      <InfoCard
        title="Build a standout resume"
        description="Skip the struggle — start with AI templates."
        imageUrl={images["resume_icon"]}
      />
      <InfoCard
        title="We study how they studied"
        description="Years of top student data, scrutinized for your growth."
        imageUrl={images["scrutinize_icon"]}
      />
      <InfoCard
        title="1 to 1 chatting with senior Ramgees"
        description="Tell all your harships and consult!"
        imageUrl={images["chat_icon"]}
      />
    </Container>
  );
}
