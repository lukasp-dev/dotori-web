"use client";

import Link from "next/link";
import RecommendedSchoolList from "@/components/recommended/RecommendedSchoolList";
import styled from "styled-components";
import Image from "next/image";
import images from "@/constants/images.json";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const RecommendWrapper = styled.div`
  max-width: 800px;
  margin: 6rem auto 1rem auto;
  display: flex;
  justify-content: center
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const GoToCartWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const AddButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export default function RecommendPage() {
  return (
    <Wrapper>
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
        </TitleRow>
      </RecommendWrapper>
      <ListWrapper>
        <RecommendedSchoolList/>
      </ListWrapper>
      <GoToCartWrapper>
        <Link href="/cart">
          <AddButton>Go to Backpack</AddButton>
        </Link>
      </GoToCartWrapper>
    </Wrapper>
  );
}