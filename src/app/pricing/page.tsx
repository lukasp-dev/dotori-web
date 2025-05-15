"use client";

import styled from "styled-components";
import PricingCards from "@/components/pricing/PricingCards";

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 2rem;
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
        <PricingTitle>Our Pricing</PricingTitle>
        <PricingSubtitle>
          Here are the prices for our services.
          You can see which service you need and pay for it.
        </PricingSubtitle>
      </PricingHeader>
      
      <CardsContainer>
        <PricingCards
          title="University Recommendation"
          price="$10"
          description="We offer recommendations for 5 safety colleges and for the rest(rest of safety, target, reach), we require to pay $10"
        />
        <PricingCards
          title="Resume Builder"
          price="$15"
          description="We offer Resume helper service for the people who does not have resume yet and want to get help from our AI"
        />
        <PricingCards
          title="Essay Helper for College Application"
          price="$100 per College"
          description="$100 for all the essays that certain college requires"
        />
      </CardsContainer>
    </PricingContainer>
  );
}
