"use client";

import Image from "next/image";
import styled from "styled-components";
import { useCartStorage } from "@/hooks/cart/useCartStorage";
import images from "@/constants/images.json";

const CartWrapper = styled.div`
  max-width: 800px;
  margin: 5rem auto;
  padding: 2rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
`;

const ItemName = styled.span`
  font-weight: 500;
`;

const ItemPrice = styled.span`
  color: gray;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
`;

const Total = styled.div`
  margin-top: 2rem;
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CartPage = () => {
  const items = useCartStorage((state) => state.items);
  const removeFromCart = useCartStorage((state) => state.removeFromCart);
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartWrapper>
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
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id}>
              <div>
                <ItemName>{item.name}</ItemName>
                <ItemPrice> - ${item.price}</ItemPrice>
              </div>
              <RemoveButton onClick={() => removeFromCart(item.id)}>
                Remove
              </RemoveButton>
            </CartItem>
          ))}
          <Total>Total: ${totalPrice.toFixed(2)}</Total>
        </>
      )}
    </CartWrapper>
  );
};

export default CartPage;
