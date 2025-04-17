// app/recommend/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import useRecommendSchool from "@/components/recommend/useRecommendSchool";
import { useCartStorage } from "@/lib/cart/useCartStorage";
import images from "@/constants/images.json";

const RecommendWrapper = styled.div`
  max-width: 800px;
  margin: 5rem auto;
  padding: 2rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SchoolItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
`;

const SchoolName = styled.span`
  font-weight: 500;
`;

const AddButton = styled.button`
  padding: 0.3rem 0.8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const CheckoutButton = styled.button`
  margin-top: 2rem;
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  float: right;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const RecommendPage = () => {
  const { schools, loading } = useRecommendSchool();
  const addToCart = useCartStorage((state) => state.addToCart);
  const removeFromCart = useCartStorage((state) => state.removeFromCart);
  const items = useCartStorage((state) => state.items);
  const router = useRouter();

  return (
    <RecommendWrapper>
      <TitleRow>
        <Image 
          src={images["tori"]}
          alt = "dotori logo"
          width={95}
          height={90}
          priority
        />
        <Title>Tori picked these Schools for you</Title>
      </TitleRow>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {schools.map((school) => {
            const alreadyInCart = items.some((i) => i.id === school.id);
            const toggleCart = () => {
              if (alreadyInCart) removeFromCart(school.id);
              else addToCart(school);
            };
            return (
              <SchoolItem key={school.id}>
                <SchoolName>{school.name}</SchoolName>
                <AddButton onClick={toggleCart}>
                  {alreadyInCart ? "✅ Added" : "Add to Backpack"}
                </AddButton>
              </SchoolItem>
            );
          })}
          <CheckoutButton onClick={() => router.push("/cart")}>
            Go to Backpack
          </CheckoutButton>
        </>
      )}
    </RecommendWrapper>
  );
};

export default RecommendPage;

