"use client";

import styled from "styled-components";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchRecommendedSchools } from "@/store/recommendedSchoolsSlice";
import { addToCart } from "@/store/cartSlice";
import { RootState, AppDispatch } from "@/store";
import RecommendedSchoolItem from "./RecommendedSchoolItem";
import Image from "next/image";
import images from "@/constants/images.json";

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

const RecommendedSchoolList = () => {
    const dispatch: AppDispatch = useDispatch();
    const { schools, loading } = useSelector(
        (state: RootState) => state.recommendedSchools
    );
    useEffect(() => {
        dispatch(fetchRecommendedSchools());
    }, [dispatch]);

    if(loading) return <p>Loading...</p>

    return (
        <div>
            <TitleRow>
                <Image 
                    src={images["tori"]}
                    alt = "tori"
                    width={95}
                    height={90}
                    priority
                />
                <Title>Tori picked these Schools for you</Title>
            </TitleRow>
            {schools.map((school) => (
                <RecommendedSchoolItem
                    key={school.id}
                    school={school}
                    onAdd={() => dispatch(addToCart(school))}
                />
            ))}
        </div>
    )
}
export default RecommendedSchoolList;