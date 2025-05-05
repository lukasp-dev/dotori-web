"use client";

import styled from "styled-components";

const GoogleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border || "#ccc"};
    border-radius: 8px;
    background-color: white;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f9f9f9;
    }

    img {
        width: 20px;
        height: 20px;
    }
`;

export default GoogleButton;
