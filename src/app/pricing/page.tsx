"use client";

import styled from "styled-components";
import PricingCards from "@/components/pricing/PricingCards";

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  gap: 2rem;
`;

const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PricingTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const PricingSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;

export default function PricingPage() {
  return (
    <PricingContainer>
      <PricingHeader>
        <PricingTitle>심플한 가격 정책</PricingTitle>
        <PricingSubtitle>
          당신의 비즈니스에 맞는 최적의 요금제를 선택하세요. 
          언제든지 업그레이드하거나 다운그레이드할 수 있습니다.
        </PricingSubtitle>
      </PricingHeader>
      
      <CardsContainer>
        <PricingCards
          title="Basic"
          price="₩10,000/월"
          description="소규모 비즈니스를 위한 기본 기능"
        />
        <PricingCards
          title="Professional"
          price="₩25,000/월"
          description="성장하는 비즈니스를 위한 모든 기능"
        />
        <PricingCards
          title="Enterprise"
          price="문의하기"
          description="대규모 비즈니스를 위한 맞춤형 솔루션"
        />
      </CardsContainer>
    </PricingContainer>
  );
}
