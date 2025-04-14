"use client";

import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not logged in</p>;

  return (
    <div>
      <p>Welcome, {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <img src={session.user?.image || ""} alt="Profile" />

      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </div>
  );
}
