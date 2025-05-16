"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { googleToSpring } from "@/lib/social-auth/googleToSpring";

export default function AuthBridge() {
  const { data: session } = useSession();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (session?.user?.email && session?.user?.name && !hasProcessed.current) {
      hasProcessed.current = true;
      googleToSpring(session.user.email, session.user.name).catch((error) => {
        console.error("Social login failed:", error);
        hasProcessed.current = false;
      });
    }
  }, [session]);

  return null;
}
