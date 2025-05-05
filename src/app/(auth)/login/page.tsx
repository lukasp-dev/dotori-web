"use client";

import Link from "next/link";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { loginWithCredentials } from "@/lib/auth/login";
import { Input } from "@/components";
import { InputBox } from "@/components/InputBox";
import Button from "@/components/Button";
import GoogleButton from "@/components/GoogleButton";
import { useRouter } from "next/navigation";
import { persistAuth } from "@/utils/persistAuth";


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

const Text = styled.p`
  font-size: 14px;
  color: #6b7280;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      const { accessToken, user } = await loginWithCredentials(email, password);
      persistAuth(accessToken, user); 
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data || "Login failed");
    }
  }

  return (
    <Container>
      <Card>
        <Title>Welcome back</Title>
        <InputBox>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        </InputBox>
        <GoogleButton onClick={() => signIn("google", { callbackUrl: "/" })}>
        <img
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            alt="google"
            width={20}
            height={20}
          />
          Continue with Google
        </GoogleButton>
        <Button onClick={handleLogin}>Log in</Button>
        {error && <Text>{error}</Text>}
        <Text>
          New here? <Link href="/signup">Create an account</Link>
        </Text>
      </Card>
    </Container>
  );
}