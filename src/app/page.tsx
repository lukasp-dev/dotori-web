"use client";
import styled from "styled-components";
import ScorePrompt from "@/components/ScorePrompt";
import ResumePrompt from "@/components/ResumePrompt";
import Strengths from "@/sections/Strengths";
import Hero from "@/sections/Hero";
import GrowingTori from "@/components/GrowingTori";
import Footer from "@/components/Footer";

const Wrapper = styled.div`
  min-height: 100vh;
  font-family: var(--font-geist-sans);
`;
const ContentWrapper = styled.div`
  min-height: 100vh;
  padding: 0.5rem;
  font-family: var(--font-geist-sans);
`;
const Main = styled.main`
  margin-top: 10rem;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Paragraph = styled.p`
  color: ${(props) => (props.theme.mode === "dark" ? "#d1d5db" : "#6b7280")};
  margin-top: 1rem;
`;

export default function Home() {
  return (
    <Wrapper>
      <ContentWrapper>
        <Main>
          <ResumePrompt />
          <ScorePrompt />
          <Hero />
          <Strengths />
          <GrowingTori />
        </Main>
      </ContentWrapper>
      <Footer/>
    </Wrapper>
  );
}
