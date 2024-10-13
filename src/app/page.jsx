import React from "react";
import AuthButton from "@/components/AuthButton";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { loggedUser } from "@/lib/auth";

const Home = async () => {
  const user = await loggedUser();

  console.log(user);

  return (
    <main>
      <section className="grid place-items-center h-dvh">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Welcome to Zenior</CardTitle>
            <CardDescription>
              Get started by logging in with your SCU email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user ? (
              <p>You&apos;re signed in as {user.email}</p>
            ) : (
              <p>You&apos;re not signed in</p>
            )}
          </CardContent>
          <CardFooter>
            <AuthButton className="w-full" />
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default Home;
