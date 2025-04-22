"use client";

import styled from "styled-components";
import RecommendedSchoolList from "@/components/recommended/RecommendedSchoolList";
import { useRouter } from "next/navigation";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  gap: 1.5rem;
  margin: 0 auto;
  width: 30rem;
  max-width: 600px;
  padding: 0 1rem;
`;

const RecommendWrapper = styled.div`
  width: 100%;
`;

const GoToCartWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const router = useRouter();
  return (
    <Wrapper>
      <RecommendWrapper>
        <RecommendedSchoolList/>
      </RecommendWrapper>
      <GoToCartWrapper>
          <AddButton onClick={() => router.push("/cart")}>Go to Backpack</AddButton>
      </GoToCartWrapper>
    </Wrapper>
  );
}