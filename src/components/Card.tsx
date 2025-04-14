"use client";

import styled from "styled-components";
import Image from "next/image";

interface InfoCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition: box-shadow 0.3s, background 0.3s, z-index 0.3s;
  cursor: pointer;
  width: 100%;
  max-width: none;
  position: relative;

  &:hover {
    box-shadow: 0 0 20px rgba(112, 74, 30, 0.3);
    z-index: 999;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  min-width: 0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Description = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary || "#6b7280"};
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  flex-shrink: 0;
`;

const InfoCard = ({ title, description, imageUrl }: InfoCardProps) => {
  return (
    <CardWrapper>
      <TextWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextWrapper>

      <ImageWrapper>
        <Image
          src={imageUrl}
          alt={title}
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </ImageWrapper>
    </CardWrapper>
  );
};

export default InfoCard;
