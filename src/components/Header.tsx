"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import images from "@/constants/images.json";
import Hamburger from "@/components/Hamburger"; // hamburger import

const HeaderWrapper = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 640px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 1rem;
    border-radius: 8px;
    width: 140px;
    z-index: 10;
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.colors.textPrimary};
  text-decoration: none;
  font-weight: 500;
  &:hover {
    color: ${(props) => props.theme.colors.textHover};
  }
`;

const Button = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
`;

const LoginButton = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
`;

const SignUpButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border: none;
  text-decoration: none;
`;

const Header = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Link href="/">
          <Image
            src={images["dotori-square-logo"]}
            alt="Dotori Logo"
            width={40}
            height={40}
          />
        </Link>
      </LogoWrapper>

      <Hamburger open={menuOpen} onClick={() => setMenuOpen((prev) => !prev)} />

      <Nav $isOpen={menuOpen}>
        <NavLink href="/pricing">pricing</NavLink>
        <NavLink href="/how-to-dotori">how to dotori</NavLink>

        {session ? (
          <>
            <span>{session.user?.name}</span>
            <LoginButton onClick={() => signOut()}>Log out</LoginButton>
          </>
        ) : (
          <SignUpButton as={Link} href="/signup">
            sign up
          </SignUpButton>
        )}
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
