import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    //user: {
    email: string;
    name: string;
    lastname: string;
    password?: string;
    accessToken: string;
    //}
  }
  interface User {
    role: string;
  }
}
