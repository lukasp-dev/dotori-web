import styled from "styled-components";

const Wrapper = styled.div`
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0,05);
`;

const ItemName = styled.h3`
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


interface Props {
    id: number;
    name: string;
    price: number;
    onRemove: () => void;
}

const CartItem = ({id, name, price, onRemove}: Props) => {
    return (
        <Wrapper>
            <div>
                <ItemName>{name}</ItemName>
                <ItemPrice>${price}</ItemPrice>
            </div>
            <RemoveButton>Delete</RemoveButton>
        </Wrapper>
    );
}
export default CartItem;