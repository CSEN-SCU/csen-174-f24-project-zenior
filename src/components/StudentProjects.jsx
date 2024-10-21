import React from "react";
import PropTypes from "prop-types";
import { projects } from "@/lib/server/actions";

const StudentProjects = async ({ user }) => {
  const studentProjects = await projects.get({
    members: {
      some: {
        studentId: user.student.id,
      },
    },
  });

  // academicYear: '1984',
  // department: 'Test Department',
  // isInterdisciplinary: true,
  // status: 'proposed',
  // groupOpen: true,
  // advisorId: null,
  // coAdvisorId: null,
  // createdAt: 2024-10-21T19:28:26.671Z,
  // updatedAt: 2024-10-21T19:28:26.671Z,
  // members: [Array],
  if (studentProjects) {
    return (
      <>
        <h2>Projects</h2>
        <ul>
          {studentProjects.map((project) => (
            <li key={project.id}>
              <h3>{project.title}</h3>
              <p>Description: {project.description}</p>
              <p>Status: {project.status}</p>
              <p>Department: {project.department}</p>
              <p>AY: {project.academicYear}</p>
              <p>Group Open: {project.groupOpen.toString()}</p>
              <p>Interdisciplinary: {project.isInterdisciplinary.toString()}</p>
              <h4>Members</h4>
              <ul>
                {project.members.map((member) => (
                  <li key={member.student.id}>
                    {member.student.firstName} {member.student.lastName}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </>
    );
  }
};

StudentProjects.propTypes = {
  user: PropTypes.object.isRequired,
};

export default StudentProjects;
