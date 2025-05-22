"use client";

import styled from "styled-components";
import { useSession } from "next-auth/react";
import UserInfo from "@/components/userProfile/UserInfo";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default function Profile() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    );
  }

  return <UserInfo />;
}
