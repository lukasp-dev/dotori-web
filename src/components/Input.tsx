import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: #7e673d;
    box-shadow: 0 0 0 1px #7e673d;
  }
  &::placeholder {
    color: #9ca3af;
  }
`;
