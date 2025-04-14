"use client";

import Link from "next/link";
import styled from "styled-components";
import { signIn } from "next-auth/react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: #ffffff;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f6f2;
  }
`;

const Text = styled.p`
  font-size: 14px;
  color: #6b7280;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

export default function LoginPage() {
  return (
    <Container>
      <Card>
        <Title>Welcome back</Title>

        <GoogleButton onClick={() => signIn("google", { callbackUrl: "/" })}>
          Continue with Google
        </GoogleButton>

        <Text>
          New here? <Link href="/signup">Create an account</Link>
        </Text>
      </Card>
    </Container>
  );
}
