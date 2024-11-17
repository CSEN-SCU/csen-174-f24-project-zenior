"use client";

import { signIn, signOut } from "next-auth/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const Login = () => {
  return (
    <button
      onClick={() => signIn("google", { redirectTo: "/success" })}
      className="hover:text-gray-300"
    >
      Login
    </button>
  );
};

export const Logout = () => {
  return (
    <DropdownMenuItem
      onClick={() =>
        signOut({
          redirectTo: "/goodbye",
        })
      }
      className="cursor-pointer"
    >
      Sign out
    </DropdownMenuItem>
  );
};
