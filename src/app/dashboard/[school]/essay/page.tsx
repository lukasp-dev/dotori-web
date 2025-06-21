"use client";

import styled from "styled-components";
import { useState } from "react";
import Topics from "@/components/dashboard/essays/Topics";
import EssayText from "@/components/dashboard/essays/EssayText";
import { formatTitle } from "@/utils/essayTopics";

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  height: 100%;
  margin-top: 4rem;
  background-color: ${(props) => props.theme.colors.textPrimary};
`;

export default function EssayPage() {
    const [selected, setSelected] = useState("common_app");
  
    const commonApp = "Describe an obstacle you’ve overcome.";
    const supplementary = {
      "0": "Why do you want to attend this university?",
      "1": "Describe a community you belong to.",
    };
  
    return (
      <Container>
        <Topics
          commonApp={commonApp}
          supplementary={supplementary}
          selected={selected}
          onSelectTopic={setSelected}
        />
        <EssayText title={selected} text={formatTitle(selected)} />
      </Container>
    );
}