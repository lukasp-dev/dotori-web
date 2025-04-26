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
  }
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
const Dashboard = () => {
  const schools = useSelector((state: RootState) => state.progress);

  const fallback = [
    {
      id: 1,
      name: "Georgia Tech",
      steps: {
        ResumeOutline: true,
        FirstDraft: true,
        AiFeedback: false,
        RequestedHumanize: false,
        Humanized: false,
        Submitted: false,
      },
    },
    {
      id: 2,
      name: "NYU",
      steps: {
        ResumeOutline: true,
        FirstDraft: true,
        AiFeedback: true,
        RequestedHumanize: true,
        Humanized: false,
        Submitted: false,
      },
    },
    {
      id: 3,
      name: "U Georgia",
      steps: {
        ResumeOutline: true,
        FirstDraft: false,
        AiFeedback: false,
        RequestedHumanize: false,
        Humanized: false,
        Submitted: false,
      },
    },
    {
      id: 4,
      name: "UMN Twin Cities",
      steps: {
        ResumeOutline: true,
        FirstDraft: true,
        AiFeedback: true,
        RequestedHumanize: true,
        Humanized: true,
        Submitted: true,
      },
    },
  ];

  const dataToShow = schools.length > 0 ? schools : fallback;

  return (
    <CardWrapper>
      <TitleRow>
        <Image 
          src={images["tori-face"]}
          alt = "tori"
          width={95}
          height={90}
          priority
        />
        <Title>Dashboard</Title>
      </TitleRow>
      { dataToShow.map((school) => (
        <DashboardCard key={school.id} school={school} />
      ))}
    </CardWrapper>
  );
};

export default Dashboard;
