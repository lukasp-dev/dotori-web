"use client";

import styled from "styled-components";
import Dashboard from "@/components/dashboard/Dashboard";

interface SchoolPageProps {
  params: {
    school: string;
  };
}
export default function SchoolPage({ params }: SchoolPageProps) {
  const { school } = params;

  const decodedSchoolName = decodeURIComponent(school);

  return (
    <Container>
      <h1>Welcome to the {decodedSchoolName} Dashboard!</h1>
      <p>This is the main page for {decodedSchoolName}.</p>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
  h1 {
    color: #2c3e50;
    margin-bottom: 30px;
    text-align: center;
  }
`;
