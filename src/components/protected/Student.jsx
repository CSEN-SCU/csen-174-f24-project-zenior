import React from "react";
import PropTypes from "prop-types";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const session = await auth();
  const user = session?.user;
  const roles = ["student"];

  if (!roles.includes(user?.role)) {
    //!@note: Should we throw a deny?
    redirect("/");
  }

  return <>{children}</>;
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
