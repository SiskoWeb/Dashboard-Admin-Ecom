import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "text", placeholder: "test@test.com" },
        password: { type: "password", placeholder: "Pa$$w0rd" },
      },

      async authorize(credentials) {
        const authResponse = await fetch(
          "http://localhost/adminDashboard/Backend/login.php",
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

        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.role = (user as any).role;
        token.id = user.id;

        console.log({ user });
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: "yassine",
};
export default NextAuth(authOptions);
