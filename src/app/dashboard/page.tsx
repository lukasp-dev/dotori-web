"use client";

import styled from "styled-components";
import Dashboard from "@/components/dashboard/Dashboard";

const PageWrapper = styled.div`
  background-color: #FFF8E7;
  min-height: 100vh;
  width: 100%;
`;

const Wrapper = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  width: 30rem;
  max-width: 600px;
  padding: 0 1rem;
`;

export default function DashboardPage() {
    return (
      <PageWrapper>
        <Wrapper>
          <Dashboard />
        </Wrapper>
      </PageWrapper>
    );
  }