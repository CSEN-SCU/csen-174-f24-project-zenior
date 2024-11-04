"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginCard from "@/components/LoginCard";

export default function Home({ session }) {
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "faculty":
          router.push("/faculty");
          break;
        case "student":
          router.push("/student");
          break;
        case "super_admin":
          router.push("/super-admin");
          break;
        default:
          break;
      }
    }
  }, [user, router]);

  return (
    <main className="flex items-center justify-center flex-grow bg-white">
      {!user && <LoginCard />} 
    </main>
  );
}
