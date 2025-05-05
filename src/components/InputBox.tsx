"use client";

import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    overflow: hidden;

    input + input {
        border-top: 1px solid ${({ theme }) => theme.colors.border};
    }
`;

export const InputBox = ({ children }: { children: React.ReactNode }) => {
    return <Wrapper>{children}</Wrapper>;
};
