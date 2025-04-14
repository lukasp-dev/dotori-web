"use client";
import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #2d3748; /* 대략 Tailwind의 bg-gray-800 */
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>© 2025 Your Company. All rights reserved.</p>
    </StyledFooter>
  );
};

export default Footer;
