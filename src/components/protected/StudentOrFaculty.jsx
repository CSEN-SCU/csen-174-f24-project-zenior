import React from "react";
import PropTypes from "prop-types";
import { loggedUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const user = await loggedUser();
  const roles = ["faculty", "student"];

  if (!roles.includes(user?.role)) {
    redirect("/");
  }

  return <>{children}</>;
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
