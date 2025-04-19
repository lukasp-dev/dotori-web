"use client";

import RecommendedSchoolList from "@/components/recommended/RecommendedSchoolList";
import styled from "styled-components";
import Image from "next/image";
import images from "@/constants/images.json";

const RecommendWrapper = styled.div`
  max-width: 800px;
  margin: 5rem auto;
  padding: 2rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export default function RecommendPage() {
  return (
    <RecommendWrapper>
        <TitleRow>
            <Image 
              src={images["tori"]}
              alt = "dotori logo"
              width={95}
              height={90}
              priority
            />
            <Title>Tori picked these Schools for you</Title>
            <RecommendedSchoolList/>
        </TitleRow>
    </RecommendWrapper>
  );
}