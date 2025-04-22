"use client";

import styled from "styled-components";
import { FaEnvelope, FaCalendarCheck, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useTheme } from "styled-components";

const StyledFooter = styled.footer`
  background-color: #e8f4cd;
  color: white;
  padding: 3rem 1rem;
  font-size: 0.875rem;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
`;

const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const IconItem = styled.a`
  text-align: center;
  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  &:hover svg {
    transform: scale(1.1);
    transition: all 0.2s ease;
  }
`;

const IconLabel = styled.p`
  margin: 0;
  font-size: 0.85rem;
`;

const CompanyInfo = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #aaa;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const Footer = () => {
  const theme = useTheme();
  return (
    <StyledFooter>
      <Container>
        <div>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Always here for every dotori </p>
          <Title>Equal Opportunities for Students at a Fair Price!</Title>
          <p>Office Hour (Mon - Fri) | 12:00~17:00</p>
        </div>
        <IconRow>
          <IconItem 
            href="mailto:dotoripack@gmail.com"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FaEnvelope size={24} color={theme.colors.textPrimary}/>
            <IconLabel>Email Us</IconLabel>
          </IconItem>
          <IconItem
            href="https://cal.com/dotori-pack/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FaCalendarCheck size={24} color={theme.colors.textPrimary}/>
            <IconLabel>Appointment</IconLabel>
          </IconItem>
          <IconItem
            href="https://www.linkedin.com/company/dotoripack"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
              <FaLinkedin size={24} color={theme.colors.textPrimary}/>
              <IconLabel>LinkedIn</IconLabel>
          </IconItem>
          <IconItem
            href="https://www.instagram.com/dotori_2025"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FaInstagram size={24} color={theme.colors.textPrimary}/>
            <IconLabel>Instagram</IconLabel>
          </IconItem>
        </IconRow>

        <CompanyInfo>
          Bussiness Name : Dotori Inc. | CEO : Jehoon Park<br/>
          Address : Minneapolis, MN, United States | Email : dotoripack@gmail.com<br/>
          © 2025 Your Company. All rights reserved.
        </CompanyInfo>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
