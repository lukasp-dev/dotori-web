"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { logout } from "@/lib/auth/logout";

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
`;

const Panel = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? "0" : "-19rem")};
    width: 10rem;
    height: 100%;
    background-color: white;
    box-shadow: -0.125rem 0 0.3125rem rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 101;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const DrawerItem = styled.button`
    background: none;
    border: none;
    text-align: left;
    font-size: 1rem;
    color: #111827;
    cursor: pointer;
    padding: 0.5rem 0;
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const ProfileDrawer = ({ isOpen, onClose }: ProfileDrawerProps) => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logout();
            await signOut({ redirect: false });
            router.push("/");
            onClose();
        }
        catch(error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <>
            <Overlay $isOpen={isOpen} onClick={onClose} />
            <Panel $isOpen={isOpen}>
                <DrawerItem onClick={() => {router.push("/profile"); onClose();}}>
                    My Profile
                </DrawerItem>
                <DrawerItem onClick={() => {router.push("/cart"); onClose();}}>
                    My Backpack
                </DrawerItem>
                <DrawerItem onClick={() => {router.push("/payment"); onClose();}}>
                    Payment Method
                </DrawerItem>
                <DrawerItem
                    onClick={async () => {
                        await signOut({
                        redirect: false,
                        callbackUrl: "/",
                        });
                        await logout();
                        window.location.href = "/";
                        onClose();
                    }}
                >
                    ⍈ Logout 
                </DrawerItem>
            </Panel>
        </>
    )
}

export default ProfileDrawer;
