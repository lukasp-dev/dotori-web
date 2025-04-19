import { useSelector } from "react-redux";
import { RootState } from "@/store";
import styled from "styled-components";

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #eee;
  margin: 2rem 0;
  max-width: 40rem;
  width: 100%;
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const Total = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const PurchaseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const CartSummary = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const total = items.reduce((acc, item) => acc + item.price, 0);
  
    return (
      <SummaryWrapper>
        <Divider />
        <Total>Total Amount: ${total}</Total>
        <PurchaseButton>Purchase</PurchaseButton>
      </SummaryWrapper>
    );
};
export default CartSummary;