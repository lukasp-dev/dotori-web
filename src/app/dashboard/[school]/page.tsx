"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { fetchSchoolById } from "@/utils/fetchSchoolById";

import SchoolHeader from "@/components/dashboard/school/SchoolHeader";
import SchoolRanking from "@/components/dashboard/school/SchoolRanking";
import EssayList from "@/components/dashboard/school/EssayList";
import ImportanceTable from "@/components/dashboard/school/ImportanceTable";
import MatchingScoreChart from "@/components/dashboard/school/MatchingScoreChart";
import SchoolMap from "@/components/dashboard/school/SchoolMapClientOnly";

export default function SchoolPage() {
  const params = useParams();
  const decodedSchoolName = decodeURIComponent(params.school as string);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (!decodedSchoolName) return;
    fetchSchoolById(decodedSchoolName)
      .then(setData)
      .catch((err) => console.error(err));
  }, [decodedSchoolName]);

  if (typeof window === "undefined") return null;
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <SchoolHeader name={data.name} />
      <SchoolRanking
        nicheRank={`Niche #${data.rankings.niche.total_rank}`}
        usRank={`US News #${data.rankings.us}`}
        qsRank={`QS #${data.rankings.qs}`}
        majorRanks={data.rankings.niche.majors_rank.map((major: any) => `${major.field} #${major.rank} of ${major.total}`)}
      />
      <ContentWrapper>
        <LeftColumn>
          <EssayList
            commonApp={data.essays.common_app}
            supplementary={data.essays.supplementary}
          />
          <ImportanceTable data={data.essays.importance_table} />
        </LeftColumn>

        <RightColumn>
          <SchoolMap coordinates={data.location.coordinates} />
          <MatchingScoreChart data={{ details: data.matching_score.details, max_score: data.matching_score.max_score }} />
        </RightColumn>
      </ContentWrapper>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.colors.lightGreen};
  padding: 100px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem 2rem;
  flex-wrap: wrap;
`;

const LeftColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: 1.5rem;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 1.5rem;
`;