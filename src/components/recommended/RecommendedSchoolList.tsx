"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { RootState, AppDispatch } from "@/store";
import { fetchDemoSchools } from "@/store/demoSchoolsSlice";
import RecommendedSchoolItem from "./RecommendedSchoolItem";
import images from "@/constants/images.json";

const ListWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-family: var(--font-fredoka);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const RecommendedSchoolList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const { schools: allSchools, loading } = useSelector((state: RootState) => state.demoSchools);

  useEffect(() => {
    dispatch(fetchDemoSchools());
  }, [dispatch]);

  const userId = session?.user?.id;

  const filteredSchools = userId ? allSchools.filter((school) => school.userId === userId) : [];

  const sortedSchools = [...filteredSchools].sort((a, b) => b.score - a.score);

  if (loading) return <p>Loading...</p>;
  if (!userId) return <p>Please sign in to view your recommended schools</p>;

  return (
    <ListWrapper>
      <TitleRow>
        <Image src={images["tori"]} alt="tori" width={95} height={90} priority />
        <Title>Tori calculated your scores on Top {sortedSchools.length} Schools</Title>
      </TitleRow>

      {sortedSchools.map((school) => (
        <RecommendedSchoolItem
          key={school.school_name}
          school={school}
        />
      ))}
    </ListWrapper>
  );
};

export default RecommendedSchoolList;