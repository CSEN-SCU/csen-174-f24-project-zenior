"use client";

import React from "react";
import PropTypes from "prop-types";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";

const AuthButton = ({ className }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  if (session) {
    return (
      <Button
        className={className}
        onClick={() => {
          setLoading(true);
          toast({
            title: "Signed out",
            description: "You have been signed out",
          });
          signOut();
        }}
      >
        {loading ? <Loading /> : "Sign out"}
      </Button>
    );
  }

  return (
    <Button
      className={className}
      onClick={() => {
        setLoading(true);
        toast({
          title: "Signing in",
          description: "Redirecting to sign in",
        });
        signIn("google");
      }}
    >
      {loading ? <Loading /> : "Sign in with Google"}
    </Button>
  );
};

AuthButton.propTypes = {
  className: PropTypes.string,
};

const Loading = () => {
  return (
    <>
      <Spinner className="mr-2 fill-black" />
      Loading...
    </>
  );
};

export default AuthButton;
