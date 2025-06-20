"use client";

import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";
import styled from "styled-components";

interface ScoreDetails {
  [key: string]: number;
}

interface Props {
  data: {
    details: ScoreDetails;
    max_score: ScoreDetails;
  };
}

const normalize = (value: number, max: number): number => {
  if (value === 0 && max === 0) return 10;
  if (max === 0) return 0;
  return Math.min((value / max) * 10, 10);
};

export default function MatchingScoreChart({ data }: Props) {
  const keys = Object.keys(data.details);
  const chartData = keys.map((key) => ({
    subject: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // 예: "volunteer_work" → "Volunteer Work"
    score: normalize(data.details[key], data.max_score[key]),
  }));

  return (
    <Wrapper>
      <Title>Matching Score</Title>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            tick={<CustomTick />}
            tickLine={false}
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontFamily: "var(--font-fredoka)", fontSize: 10 }} />
          <Radar
            name="score"
            dataKey="score"
            stroke="#765127"
            fill="#765127"
            fillOpacity={0.6}
            isAnimationActive={true}
            animationDuration={1000}
            animationBegin={200}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: var(--font-fredoka);
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-family: var(--font-fredoka);
  font-size: 22px;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const CustomTick = (props: any) => {
  const { x, y, payload, textAnchor } = props;
  const lines = payload.value.split(" ");

  return (
    <text x={x} y={y} textAnchor={textAnchor} fontSize={14} fontFamily="var(--font-fredoka)">
      {lines.map((line: string, index: number) => (
        <tspan x={x} dy={index === 0 ? "0" : "1.2em"} key={index}>
          {line}
        </tspan>
      ))}
    </text>
  );
};
