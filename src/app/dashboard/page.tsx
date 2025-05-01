"use client";

import styled from "styled-components";
import Dashboard from "@/components/dashboard/Dashboard";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-top: 10rem;
  padding-bottom: 10rem;
  width: 100%;
`;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start; 
  gap: 1rem;
  margin: 0 auto;
  width: 100%;
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