import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/db';
import NextAuth from "next-auth";
var bcrypt = require('bcryptjs');

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
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

          if (bcrypt.compareSync(password, user?.password)) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
          }
        },
      }),
    ],
    pages: {
      signIn: '/login'
    },
    debug: true
  });

  export { handler as GET, handler as POST };
