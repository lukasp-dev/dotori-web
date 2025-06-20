"use client";

import styled from "styled-components";
import Image from "next/image";
import images from "@/constants/images.json";

interface Props {
  name: string;
}

export default function SchoolHeader({ name }: Props) {
  return (
    <HeaderWrapper>
      <Image
        src={images["tori"]}
        alt="tori"
        width={60}
        height={60}
        priority
      />
      <SchoolName>{name}</SchoolName>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SchoolName = styled.h2`
  margin: 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textPrimary};
  text-transform: capitalize;
  font-family: var(--font-fredoka);
`;
