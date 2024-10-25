import React from "react";
import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";

const Home = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <section className="w-full max-w-md p-4">
        <Card
          className="w-full md:w-[400px] bg-gradient-to-b from-[#811e2d] via-[#b30738] to-[#b30738] shadow-md rounded-md p-6 text-white transition-transform transform hover:shadow-lg hover:scale-105"
        >
          {/* Original for reference with no gradient:
          <Card className="w-full md:w-[400px] bg-[#b30738] shadow-md rounded-md p-6 text-white">
          */}
          <CardHeader>
            <CardTitle className="text-center text-2xl md:text-3xl font-bold mb-4 shadow-sm">
              Welcome to Zenior
            </CardTitle>
            <div className="flex justify-center mb-6">
              <Image
                src="/images/SCUseal.png"
                alt="Santa Clara University Seal"
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-0">
            {user ? (
              <p className="text-center text-lg font-semibold">
                You&apos;re a <strong>{user.role}</strong> signed in as{" "}.
                <strong>{user.email}</strong>
              </p>
            ) : (
              <p className="text-center text-lg font-semibold">
                You&apos;re not signed in.
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center mt-4">
            <AuthButton className="w-full hover:bg-[#93052c] transition-colors" aria-label="Sign in or sign out">
            </AuthButton>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default Home;
