"use client";

import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";

interface ImportanceTableProps {
    data: Record<string, string>; // e.g. { "GPA": "Very Important", ... }
}

const growBar = (width: number) => keyframes`
  from { width: 0; }
  to { width: ${width}%; }
`;

const Bar = styled.div<{ $width: number; $animate: boolean }>`
  height: 100%;
  background-color: ${(props) => props.theme.colors.textPrimary};
  width: ${({ $width, $animate }) => ($animate ? `${$width}%` : `0%`)};
  animation: ${({ $width, $animate }) =>
        $animate ? growBar($width) : "none"} 1s ease-out;
  transition: width 1s ease-out;
`;


export default function ImportanceTable({ data }: ImportanceTableProps) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // trigger animation once after mount
        setAnimate(true);
    }, []);

    return (
        <TableWrapper>
            <Title>Importance Table</Title>
            {Object.entries(data).map(([label, level]) => (
                <Row key={label}>
                    <Label>{label}</Label>
                    <BarWrapper>
                        <Bar
                            $animate={animate}
                            $width={importanceMap[level] ?? 0}
                        />
                    </BarWrapper>
                </Row>
            ))}
        </TableWrapper>
    );
}

const Title = styled.h3`
  font-family: var(--font-fredoka);
  font-size: 22px;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const importanceMap: Record<string, number> = {
    "Very Important": 100,
    "Important": 75,
    "Considered": 50,
    "Not Considered": 0,
};

const TableWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem 1.5rem 0.8rem 1.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  gap: 1rem;
`;

const Label = styled.div`
  flex: 1;
  font-family: var(--font-fredoka);
  font-size: 16px;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const BarWrapper = styled.div`
  flex: 2;
  background-color: #e0e0e0;
  border-radius: 10px;
  height: 12px;
  overflow: hidden;
`;