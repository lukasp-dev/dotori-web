"use client";

import styled from "styled-components";
import { calculateProgress } from "@/store/dashboard/calculateProgress";
import { SchoolProgress } from "@/store/dashboard/progressSlice";

interface Props {
  school: SchoolProgress;
}

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  height: 6rem;
  max-width: 30rem;
  width: 90vw;

  &:hover {
    background-color: #f5f5dc;
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const BarBackground = styled.div`
  width: 100%;
  height: 1rem;
  margin-bottom: 0.5rem;
  background-color: #f5ecd8;
  border-radius: 9999px;
`;

const Bar = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 9999px;
  transition: width 0.3s ease;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Button = styled.button`
  background-color: #f5ecd8;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
`;

const DashboardCard = ({ school }: Props) => {
  const percent = calculateProgress(school.steps as unknown as Record<string, boolean>);

  const lastStep = Object.entries(school.steps).reverse().find(([_, v]) => v)?.[0] || "Start";

  return (
    <Card>
      <Title>{school.name}</Title>
      <BarBackground>
        <Bar percent={percent} />
      </BarBackground>
      <BottomRow>
        <span>
          {percent === 0 ? "Start" : lastStep.replace(/([A-Z])/g, ' $1')}
        </span>
        <span>{percent}%</span>
      </BottomRow>
    </Card>
  );
};

export default DashboardCard;