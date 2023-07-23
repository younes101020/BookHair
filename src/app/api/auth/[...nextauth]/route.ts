import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/db';
import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    debug: true,
    pages: {
      signIn: "/login"
    },
    adapter: PrismaAdapter(prisma),
  });

  export { handler as GET, handler as POST };