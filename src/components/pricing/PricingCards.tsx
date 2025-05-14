"use client";

import styled from "styled-components";

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 12rem;
  max-width: 20rem;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

const Price = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({theme}) => theme.colors.primary};
  margin: 0;
`

const Description = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${({theme}) => theme.colors.textSecondary};
  line-height: 1.5;
`
type Props = {
    title: string;
    price: string;
    description: string;
}
const PricingCards = ({ title, price, description}: Props) => {
    return (
        <Card>
            <Title>{title}</Title>
            <Price>{price}</Price>
            <Description>{description}</Description>
        </Card>
    );
}
export default PricingCards;