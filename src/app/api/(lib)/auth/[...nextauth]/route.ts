import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/db';
import NextAuth from "next-auth";
import isSamePass from '@/lib/bcrypt/compare';
import type { NextAuthOptions } from 'next-auth';

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const {email, password} = credentials as {
          email: string;
          password: string;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        })
        if (!user) {
          throw new Error("No user found with this email");
        }

        const checkPass = await isSamePass(password, user?.password as string);

        if (!checkPass) {
          throw new Error("Password don't match");
        }

        // Any object returned will be saved in `user` property of the JWT  
        return user;
      },
    }),  
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24
  },
  callbacks: {
    async jwt({ user, token }) {
      //   update token if user is returned
      if (user) {
        token.email = user.email;
        token.accessToken = user.id;
        token.role = user.role;
      }
      //   return final_token
      return token;
    },
    async session({ session, token}) {
      //  update session from token
      session.email = token.email as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: '/login'
  },
  debug: true
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };