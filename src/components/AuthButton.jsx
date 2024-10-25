"use client";

import React from "react";
import PropTypes from "prop-types";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";
import { FcGoogle } from 'react-icons/fc'; 
import styles from "../styles/AuthButton.module.css";

const AuthButton = ({ className }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signIn("google", { redirectTo: "/success" });
      toast({
        title: "Signing in",
        description: "Redirecting to sign in",
      });
    } catch (err) {
      setError("There was an issue signing in. Please try again.");
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out",
      });
    } catch (err) {
      setError("Error signing out. Please try again.");
      setLoading(false);
    }
  };

  if (session) {
    return (
      <Button
        className={`${styles.authButton} ${className}`}
        onClick={handleSignOut}
        disabled={loading}
      >
        {loading ? <Loading /> : "Sign out"}
      </Button>
    );
  }

  return (
    <>
      {error && <p className={styles.errorText}>{error}</p>}
      <Button
        className={`${styles.authButton} ${className}`}
        onClick={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <span className={styles.iconContainer}>
              <FcGoogle />
            </span>
            Sign in with Google
          </>
        )}
      </Button>
    </>
  );
};

AuthButton.propTypes = {
  className: PropTypes.string,
};

const Loading = () => {
  return (
    <>
      <Spinner className={styles.spinner} />
      Loading...
    </>
  );
};

export default AuthButton;
