"use client";

import { signIn, signOut } from "next-auth/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"; 

export const Login = () => {
  return (
    <Button
      variant="ghost"
      className="hover:text-[#9e1b32] transition-colors text-base font-medium"
      onClick={() => signIn("google", { redirectTo: "/success" })}
    >
      Login
    </Button>
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
