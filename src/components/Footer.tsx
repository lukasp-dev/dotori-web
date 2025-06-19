"use client";

import styled from "styled-components";
import { FaEnvelope, FaCalendarCheck, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useTheme } from "styled-components";
import { usePathname } from "next/navigation";

const StyledFooter = styled.footer<{ $isDashboardSchool: boolean }>`
  background-color: ${props => props.$isDashboardSchool ? props.theme.colors.textPrimary : props.theme.colors.lightGreen};
  color: ${props => props.$isDashboardSchool ? 'white' : 'white'};
  padding: 3rem 1rem;
  font-size: 0.875rem;
  text-align: center;
`;

const Container = styled.div<{ $isDashboardSchool: boolean }>`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  color: ${props => props.$isDashboardSchool ? 'white' : props.theme.colors.textPrimary};
`;

const Title = styled.h2<{ $isDashboardSchool: boolean }>`
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  color: ${props => props.$isDashboardSchool ? 'white' : props.theme.colors.textPrimary};
`;

const IconRow = styled.div<{ $isDashboardSchool: boolean }>`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  color: ${props => props.$isDashboardSchool ? 'white' : props.theme.colors.textPrimary};
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

const IconLabel = styled.p<{ $isDashboardSchool: boolean }>`
  margin: 0;
  font-size: 0.85rem;
  color: ${props => props.$isDashboardSchool ? 'white' : 'inherit'};
`;

const CompanyInfo = styled.div<{ $isDashboardSchool: boolean }>`
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${props => props.$isDashboardSchool ? 'white' : props.theme.colors.textPrimary};
`;

const Footer = () => {
  const theme = useTheme();
  const pathname = usePathname();
  
  // dashboard/[school] 경로인지 확인 (dashboard/ 다음에 school 이름이 있는 경우만)
  const isDashboardSchool = pathname.match(/^\/dashboard\/[^\/]+$/) !== null;
  
  return (
    <StyledFooter $isDashboardSchool={isDashboardSchool}>
      <Container $isDashboardSchool={isDashboardSchool}>
        <div>
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Always here for every dotori </p>
          <Title $isDashboardSchool={isDashboardSchool}>Equal Opportunities for Students at a Fair Price!</Title>
          <p>Office Hour (Mon - Fri) | 12:00~17:00</p>
        </div>
        <IconRow $isDashboardSchool={isDashboardSchool}>
          <IconItem 
            href="mailto:dotoripack@gmail.com"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FaEnvelope size={24} color={isDashboardSchool ? 'white' : theme.colors.textPrimary}/>
            <IconLabel $isDashboardSchool={isDashboardSchool}>Email Us</IconLabel>
          </IconItem>
          <IconItem
            href="https://cal.com/dotori-pack/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FaCalendarCheck size={24} color={isDashboardSchool ? 'white' : theme.colors.textPrimary}/>
            <IconLabel $isDashboardSchool={isDashboardSchool}>Appointment</IconLabel>
          </IconItem>
          <IconItem
            href="https://www.linkedin.com/company/dotoripack"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
              <FaLinkedin size={24} color={isDashboardSchool ? 'white' : theme.colors.textPrimary}/>
              <IconLabel $isDashboardSchool={isDashboardSchool}>LinkedIn</IconLabel>
          </IconItem>
          <IconItem
            href="https://www.instagram.com/dotori_2025"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FaInstagram size={24} color={isDashboardSchool ? 'white' : theme.colors.textPrimary}/>
            <IconLabel $isDashboardSchool={isDashboardSchool}>Instagram</IconLabel>
          </IconItem>
        </IconRow>

        <CompanyInfo $isDashboardSchool={isDashboardSchool}>
          Bussiness Name : Dotori Inc. | CEO : Jehoon Park<br/>
          Address : Minneapolis, MN, United States | Email : dotoripack@gmail.com<br/>
          © 2025 Your Company. All rights reserved.
        </CompanyInfo>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
