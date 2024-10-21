"use client";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";

export const TestForm = ({ user, create }) => {
  const [newProject, setNewProject] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projcet = await create({
      title: e.target.title.value,
      description: e.target.description.value,
      academicYear: e.target.academicYear.value,
      department: e.target.department.value,
      isInterdisciplinary: e.target.isInterdisciplinary.checked,
      advisorId: null,
      coAdvisorId: null,
      members: [user],
    });
    setNewProject(projcet);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Create Test Project</h2>
        <label>
          Title
          <input type="text" name="title" required />
        </label>
        <label>
          Description
          <textarea name="description" required />
        </label>
        <label>
          Academic Year
          <input type="text" name="academicYear" required />
        </label>
        <label>
          Department
          <input type="text" name="department" required />
        </label>
        <label>
          Interdisciplinary
          <input type="checkbox" name="isInterdisciplinary" />
        </label>
        <Button type="submit">Create Test Project</Button>
      </form>
      {newProject && <p>Created project: {newProject.title}</p>}
    </>
  );
};

TestForm.propTypes = {
  user: PropTypes.object.isRequired,
  create: PropTypes.func.isRequired,
};
