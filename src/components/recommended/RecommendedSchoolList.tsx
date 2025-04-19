"use client";

import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchRecommendedSchools } from "@/store/recommendedSchoolsSlice";
import { addToCart } from "@/store/cartSlice";
import { RootState, AppDispatch } from "@/store";
import RecommendedSchoolItem from "./RecommendedSchoolItem";

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