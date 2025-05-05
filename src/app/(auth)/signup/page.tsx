"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import { InputBox } from "@/components/InputBox";
import { Input, Divider } from "@/components";
import GoogleButton from "@/components/GoogleButton";
import Button from "@/components/Button";
import { useState } from "react";
import { signup } from "@/lib/auth/signup";
import { persistAuth } from "@/utils/persistAuth";
import { useRouter } from "next/navigation";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const { accessToken, user } = await signup({ email, password, firstName, lastName });
      persistAuth(accessToken, user);
      alert("Signup successful!");
      router.push("/");
    } catch (err: any) {
      alert(err?.response?.data || "Signup failed.");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Create your account</Title>

        <InputBox>
          <Input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </InputBox>

        <GoogleButton onClick={() => signIn("google")}>
          <img
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            alt="google"
            width={20}
            height={20}
          />
          Continue with Google
        </GoogleButton>

        <Divider>or</Divider>

        <Button onClick={handleSignup}>Sign Up</Button>

        <Text>
          Already have an account? <Link href="/login">Log in</Link>
        </Text>
      </Card>
    </Container>
  );
}