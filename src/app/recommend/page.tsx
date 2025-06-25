"use client";

import styled from "styled-components";
import RecommendedSchoolList from "@/components/recommended/RecommendedSchoolList";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  gap: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 10rem;
  width: 100%;
`;

const RecommendWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const GoToCartWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GotoCartButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.textPrimary};
  }
`;

const SignInButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.textPrimary};
  }
`;

export default function RecommendPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <Wrapper>
      <RecommendWrapper>
        <RecommendedSchoolList/>
      </RecommendWrapper>
      <GoToCartWrapper>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <GotoCartButton onClick={() => router.push("/cart")}>Go to Backpack</GotoCartButton>
        ) : (
          <SignInButton onClick={() => router.push("/login")}>Sign In</SignInButton>
        )}
      </GoToCartWrapper>
    </Wrapper>
  );
}