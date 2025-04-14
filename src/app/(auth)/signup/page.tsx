"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import { GoogleButton, Input, Divider } from "@/components";

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
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;

  input + input {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Text = styled.p`
  font-size: 14px;
  color: #6b7280;
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

export default function SignUpPage() {
  return (
    <Container>
      <Card>
        <Title>Create your account</Title>

        <InputBox>
          <Input placeholder="Enter your email" />
          <Input placeholder="Enter your password" type="password" />
        </InputBox>

        <GoogleButton onClick={() => signIn("google")}>
          <img
            src="	https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            alt="google"
            width={20}
            height={20}
          />
          Continue with Google
        </GoogleButton>

        <Divider>or</Divider>

        <Text>
          Already have an account? <Link href="/login">Log in</Link>
        </Text>
      </Card>
    </Container>
  );
}
