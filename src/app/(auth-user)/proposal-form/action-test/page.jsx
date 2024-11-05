import React from "react";
import { user, projects } from "@/lib/server/actions";
import { auth } from "@/lib/auth";
import { TestForm } from "./form";

const Test = async () => {
  const session = await auth();
  const currentUser = await user.get({ email: session.user.email });

  return <TestForm user={currentUser[0]} create={projects.create} />;
};

export default Test;
