import { useSelector } from "react-redux";
import { RootState } from "@/store";
import styled from "styled-components";
import { useRouter } from "next/navigation";

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
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const CartSummary = () => {
    const total = useSelector((state: RootState) => state.cart.total);
    const router = useRouter();
    return (
      <SummaryWrapper>
        <Divider />
        <Total>Total Amount: ${total}</Total>
        <PurchaseButton onClick={() => router.push("/payment")}>
            Purchase
        </PurchaseButton>
      </SummaryWrapper>
    );
};
export default CartSummary;