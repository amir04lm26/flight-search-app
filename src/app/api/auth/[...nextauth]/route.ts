import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db } from "@db";
import { users } from "@db/schema";
import { verifyPassword } from "@libs/auth/hash";
import { RedisClient } from "@libs/redis/client";
import { v4 as uuidv4 } from "uuid";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .then((res) => res[0]);
        if (!user) return null;

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        const sessionUuid = uuidv4();

        const client = await RedisClient.new();
        await client.set(
          `session:${sessionUuid}`,
          JSON.stringify({ id: user.id, email: user.email, name: user.name }),
          { EX: 86400 } // 24 Hours
        );

        return { id: sessionUuid, email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        const client = await RedisClient.new();
        const sessionData = await client.get(`session:${token.id}`);
        if (sessionData) {
          const user = JSON.parse(sessionData);
          session.user = { ...user, id: token.id };
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
