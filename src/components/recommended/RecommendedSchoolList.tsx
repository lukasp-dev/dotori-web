"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import { RootState, AppDispatch } from "@/store";
import { fetchDemoSchools } from "@/store/demoSchoolsSlice";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import images from "@/constants/images.json";

const ListWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-family: var(--font-fredoka);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem auto;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 40rem;
  box-sizing: border-box;
  padding: 1rem 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SchoolWrapper = styled.h2`
  margin: 0;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ScoreWrapper = styled.p`
  margin: 0.25rem 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Label = styled.span<{ color: string }>`
  margin-left: 0.5rem;
  color: ${(props) => props.color};
  font-weight: bold;
`;

const AddButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "added"
})<{ added: boolean }>`
  background-color: ${({ added, theme }) =>
    added ? theme.colors.textSecondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 8rem;
  text-align: center;
  white-space: nowrap;
`;

const getCategory = (score: number) => {
  if (score >= 80) return { label: "Safety", color: "#b0c36d" };
  if (score >= 60) return { label: "Reach", color: "#7e673d" };
  if (score >= 40) return { label: "Sub-Target", color: "#FFA07A" };
  return { label: "Target", color: "#F08080" };
};

const RecommendedSchoolList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { schools: allSchools, loading } = useSelector((state: RootState) => state.demoSchools);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchDemoSchools());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  const sortedSchools = [...allSchools].sort((a, b) => b.score - a.score);

  const handleClick = (school: { id: number; name: string; score: number }, isInCart: boolean) => {
    if (isInCart) {
      dispatch(removeFromCart(school.id));
    } else {
      dispatch(addToCart(school));
    }
  };

  return (
    <ListWrapper>
      <TitleRow>
        <Image src={images["tori"]} alt="tori" width={95} height={90} priority />
        <Title>Tori calculated your scores on Top {sortedSchools.length} Schools</Title>
      </TitleRow>

      {sortedSchools.map((school) => {
        const { label, color } = getCategory(school.score);
        const isInCart = cartItems.some((item) => item.id === school.id);

        return (
          <Card key={school.id}>
            <ContentWrapper>
              <Info>
                <SchoolWrapper>{school.name}</SchoolWrapper>
                <ScoreWrapper>
                  Score: {school.score} <Label color={color}>{label}</Label>
                </ScoreWrapper>
              </Info>
              <AddButton added={isInCart} onClick={() => handleClick(school, isInCart)}>
                {isInCart ? "✅ Added" : "Backpacking"}
              </AddButton>
            </ContentWrapper>
          </Card>
        );
      })}
    </ListWrapper>
  );
};

export default RecommendedSchoolList;