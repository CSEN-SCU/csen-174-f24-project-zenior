import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { getRole } from "@/lib/utils";

const getOrCreateUser = async (email) => {
  if (!email.endsWith("@scu.edu")) {
    console.error("Login from unauthorized email: ", email);
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const role = getRole(email);
      const newUser = await prisma.user.create({
        data: {
          email,
          role,
        },
      });

      return newUser;
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const user = await getOrCreateUser(profile.email);
        if (user) {
          profile.role = user.role;
        }
        return profile;
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return profile.email.endsWith("@scu.edu");
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  // pages: {
  //   error: "/auth/error",
  // },
});
