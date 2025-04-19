"use client";

import styled from "styled-components";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchRecommendedSchools } from "@/store/recommendedSchoolsSlice";
import { addToCart } from "@/store/cartSlice";
import { RootState, AppDispatch } from "@/store";
import RecommendedSchoolItem from "./RecommendedSchoolItem";

const SchoolList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 카드들을 가운데 정렬 */
  gap: 1.5rem;
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
        <SchoolList>
            {schools.map((school) => (
                <RecommendedSchoolItem
                    key={school.id}
                    school={school}
                    onAdd={() => dispatch(addToCart(school))}
                />
            ))}
        </SchoolList>
    )
}
export default RecommendedSchoolList;