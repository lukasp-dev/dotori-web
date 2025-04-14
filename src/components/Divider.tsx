import styled from "styled-components";

export const Divider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e5e7eb;
  }

  &::before {
    margin-right: 16px;
  }

  &::after {
    margin-left: 16px;
  }
`;
