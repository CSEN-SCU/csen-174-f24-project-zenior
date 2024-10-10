import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const newUser = async (profile) => {
  if (profile.email.endsWith("@scu.edu")) {
    const prisma = new PrismaClient();
    try {
      const user = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (!user) {
        await prisma.user.create({
          data: {
            email: profile.email,
          },
        });
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      await prisma.$disconnect();
    }
  }
  console.error("Login from unauthorized email: ", profile.email);
  return false;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const authResult = await newUser(profile);
      return authResult;
    },
  },
  // pages: {
  //   error: "/auth/error",
  // },
});

export const loggedUser = async () => {
  const session = await auth();
  if (session) {
    const prisma = new PrismaClient();
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return null;
  }
};
