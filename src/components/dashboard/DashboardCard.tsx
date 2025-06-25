"use client";

import styled from "styled-components";
import { calculateProgress } from "@/store/dashboard/calculateProgress";
import { SchoolProgress } from "@/store/dashboard/progressSlice";
import { useRouter } from "next/navigation";

interface Props {
  school: SchoolProgress;
}

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  height: 6rem;
  max-width: 30rem;
  width: 90vw;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ViewButton = styled.button`
  background-color: ${({ theme }) => theme.colors.textPrimary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DashboardCard = ({ school }: Props) => {
  const router = useRouter();

  const handleViewClick = () => {
    router.push(`/dashboard/${school.id}`);
  };

  return (
    <Card>
      <Title>{school.school_name}</Title>
      <BottomRow>
        <span>In Progress</span>
        <ViewButton onClick={handleViewClick}>View</ViewButton>
      </BottomRow>
    </Card>
  );
};

export default DashboardCard;