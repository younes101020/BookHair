import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      async authorize(credentials) {
        const { email, mot_de_passe } = credentials as {
          email: string;
          mot_de_passe: string;
        };

        try {
          const user = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email,
              mot_de_passe,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });

          if (!user.ok) {
            throw new Error("server error");
          }
          // Any object returned will be saved in `user` property of the JWT
          return await user.json();
        } catch (e) {
          return null;
        }
      },
    }),
  ],
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
    async session({ session, token }) {
      //  update session from token
      session.email = token.email as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
