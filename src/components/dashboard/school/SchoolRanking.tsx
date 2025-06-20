"use client";

import styled from "styled-components";

interface Props {
    nicheRank: string;
    usRank: string;
    qsRank: string;
    majorRanks: string[];
}

export default function SchoolRanking({ nicheRank, usRank, qsRank, majorRanks }: Props) {
    return (
        <Wrapper>
            <Line>{nicheRank} &nbsp;&nbsp;&nbsp; {usRank} &nbsp;&nbsp;&nbsp; {qsRank}</Line>
            {majorRanks.map((rank, index) => (
                <Line key={index}>{rank}</Line>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
`;

const Line = styled.p`
  margin: 4px 0;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: var(--font-fredoka);
`;
