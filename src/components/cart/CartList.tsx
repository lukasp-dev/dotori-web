"use client";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import CartItem from "./CartItem";
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

const ListWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
`;

const CartList = () => {
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);

    return (
        <ListWrapper>
            <TitleRow>
                <Image 
                    src={images["dotori-backpack"]}
                    alt = "dotori backpack"
                    width={90}
                    height={90}
                    priority
                />
                <Title>Your Backpack</Title>
            </TitleRow>
            {items.map((item) => (
                <CartItem
                    key={item.school_name}
                    school={item}
                />
            ))}
        </ListWrapper>
    );
}
export default CartList;