import React from "react";
import PropTypes from "prop-types";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const session = await auth();
  const user = session?.user;
  const roles = ["admin","faculty"];

  if (!roles.includes(user?.role)) {
    //!@note: Should when students are attempting to access faculty only pages. 
    redirect("/403");
  }

  return <>{children}</>;
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
