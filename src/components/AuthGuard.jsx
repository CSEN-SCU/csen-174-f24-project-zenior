"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import LoginCard from "@/components/LoginCard";

const AuthGuard = ({ requiredRole, children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <LoginCard />;
  }

  if (user.role !== requiredRole && requiredRole !== "any") {
    return <p className="text-red-500 text-center mt-4">You do not have permission to view this page.</p>;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  requiredRole: PropTypes.oneOf(["student", "faculty", "admin", "super_admin", "any"]),
  children: PropTypes.node.isRequired,
};

AuthGuard.defaultProps = {
  requiredRole: "any", // "any" allows any logged-in user to access the page
};

export default AuthGuard;
