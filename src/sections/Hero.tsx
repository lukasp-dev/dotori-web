"use client";

import styled from "styled-components";
import images from "@/constants/images.json";
import Image from "next/image";
import { useState } from "react";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroImage = styled.div`
  width: 600px;
  height: 600px;
  position: relative;

  @media (max-width: 768px) {
    width: 400;
    height: 400px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
`;
const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <Wrapper>
      <HeroImage>
        <Image
          src={images["hero_img"]}
          alt="acorn"
          fill
          style={{ objectFit: "contain" }}
          onError={() => setImageError(true)}
          priority
        />
      </HeroImage>
      <TextWrapper>
        <Title>
          dotori exactly knows how to get you into your dream colleges — without
          wasting thousands of dollars.
        </Title>
        <Description>
          Just like your tiny dotori (acorn) grows into a mighty oak tree,
          dotori helps you grow your potential and unlock your future.
        </Description>
      </TextWrapper>
    </Wrapper>
  );
}
