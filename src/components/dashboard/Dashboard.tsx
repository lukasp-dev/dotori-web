"use client";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Image from "next/image";
import images from "@/constants/images.json";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-family: var(--font-fredoka);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const EmptyMessage = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Dashboard = () => {
  const schools = useSelector((state: RootState) => state.progress);

  return (
    <CardWrapper>
      <TitleRow>
        <Image 
          src={images["tori-face"]}
          alt="tori"
          width={95}
          height={90}
          priority
        />
        <Title>Dashboard</Title>
      </TitleRow>

      {schools.length > 0 ? (
        schools.map((school) => (
          <DashboardCard key={school.id} school={school} />
        ))
      ) : (
        <EmptyMessage>No schools to display yet.</EmptyMessage>
      )}
    </CardWrapper>
  );
};

export default Dashboard;
