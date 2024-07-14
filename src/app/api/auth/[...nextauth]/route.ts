import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign In Now",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "E.g. harrison",
        },
        password: { label: "Password", type: "E.g. password123" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            username: credentials?.username,
            password: credentials?.password,
          },
          select: {
            identity_number: true,
            name: true,
            username: true,
          },
        });

        if (user) {
          return {
            id: user.identity_number,
            name: user.name,
            username: user.username,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRETE,
  debug: process.env.NODE_ENV === "development",
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
