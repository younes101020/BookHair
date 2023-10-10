import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/db';
import NextAuth from "next-auth";
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
        const {email, mot_de_passe} = credentials as {
          email: string;
          mot_de_passe: string;
        }

        try {
          const user = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(
                  { 
                    email, 
                    mot_de_passe,
                  },
                ),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
          })

          if(!user.ok) {
            throw new Error("server error");
          }
          // Any object returned will be saved in `user` property of the JWT  
          return await user.json();
        } catch(e) {
          return null;
        }
        
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