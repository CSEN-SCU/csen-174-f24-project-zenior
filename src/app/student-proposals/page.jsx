import React from "react";
import { projects } from "@/lib/server/actions";
import Projects from "@/components/Projects";

export default async function Student() {
  const allProjects = await projects.get();

  if (!projects || !projects.length) {
    return <h1>No projects found</h1>;
  } else {
    return <Projects projects={allProjects} />;
  }
}
