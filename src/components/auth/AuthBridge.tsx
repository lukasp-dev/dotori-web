"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { googleToSpring } from "@/lib/social-auth/googleToSpring";

export default function AuthBridge() {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.email && session?.user?.name) {
            googleToSpring(session.user.email, session.user.name);
        }
    }, [session]);

    return null; 
}
