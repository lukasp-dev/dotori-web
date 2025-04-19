"use client";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { removeFromCart } from "@/store/cartSlice";
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
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CartList = () => {
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
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
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    onRemove={() => dispatch(removeFromCart(item.id))}
                />
            ))}
        </div>
    );
}
export default CartList;