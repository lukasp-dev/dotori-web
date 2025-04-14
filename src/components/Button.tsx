import styled from "styled-components";

export const GoogleButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.textPrimary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #f7f7f7;
  }
`;
