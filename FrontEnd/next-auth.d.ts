import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      isActive: boolean;
      role: string;
    } & Session["user"];
  }
  interface User extends DefaultSession {
    id: number;
    role: string;
    isActive: boolean;
  }
}

declare module "next/auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    isActive: boolean;
  }
}
