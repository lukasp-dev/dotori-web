"use client";

import styled from "styled-components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getInitials } from "@/lib/getInitials";
import AvatarButton from "@/components/userProfile/AvatarButton";

const ProfileContainer = styled.div`
  max-width: 50rem;
  width: 100%;
  margin: 8rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 1.25rem rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 6rem 1rem;
    padding: 1.5rem;
    width: auto;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.border};
`;

const AvatarWrapper = styled.div`
  transform: scale(2);
  margin: 1.5rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const Email = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProfileSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const UserInfo = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const { name, email } = session.user;
  const initials = getInitials(name || email || "");

  return (
    <ProfileContainer>
      <ProfileHeader>
        <AvatarWrapper>
          <AvatarButton initials={initials} onClick={() => {}} />
        </AvatarWrapper>
        <UserDetails>
          <Name>{name}</Name>
          <Email>{email}</Email>
        </UserDetails>
      </ProfileHeader>

      <ProfileSection>
        <SectionTitle>Account Settings</SectionTitle>
        <LinkList>
          <LinkItem>
            <StyledLink href="/profile/resume">
              📄 View/Upload Resume
            </StyledLink>
          </LinkItem>
          <LinkItem>
            <StyledLink href="/profile/password">
              🔑 Change Password
            </StyledLink>
          </LinkItem>
          <LinkItem>
            <StyledLink href="/profile/preferences">
              ⚙️ Account Preferences
            </StyledLink>
          </LinkItem>
        </LinkList>
      </ProfileSection>
    </ProfileContainer>
  );
};

export default UserInfo;
