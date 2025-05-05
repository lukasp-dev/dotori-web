import NextAuth from "next-auth";
import { authConfig } from "@/lib/social-auth/googleAuth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
