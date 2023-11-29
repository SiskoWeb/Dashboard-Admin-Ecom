import { usersType } from "@/types/types";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        // email: { type: "text", placeholder: "test@test.com" },
        // password: { type: "password", placeholder: "Pa$$w0rd" },
      },

      async authorize(credentials) {
        const authResponse: any = await fetch(
          "http://localhost/adminDashboard/Backend/auth/login.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        // if (user.user.isActive === 0) {
        //   console.log("not active");
        //   return null;
        // }
        return user.user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.isActive = token.isActive;
      session.user.role = token.role;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isActive = user.isActive;
        token.role = user.role;

        console.log({ user });
      }
      return token;
    },

    //this fun to hanlde activing accounts
    async signIn({ user }) {
      console.log(user.isActive);
      if (user.isActive) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
  },
};
