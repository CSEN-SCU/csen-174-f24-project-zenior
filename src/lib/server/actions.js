import { prisma } from "@/lib/prisma";

// Interface to interact with the projects table.
// Can be used on server side and client side as an server action.
export const projects = {
  // Parameters:
  // - where: Object. Optional. Filters to apply to the query.
  // Example:
  // get({ id: 1 }) will return the project with id 1.
  // get({ title: "Project 1" }) will return the project with title "Project 1".
  // get({ id: 1, title: "Project 1" }) will return the project with id 1 and title "Project 1".
  // get() will return all projects.
  // Returns: Array of projects.
  get: async (where = {}) => {
    "use server";
    return await prisma.project.findMany({
      where,
      include: {
        members: true,
        AdvisorRequest: true,
        GroupRequest: true,
      },
    });
  },
  // Parameters:
  // - data: Object. Required. Data to insert into the table.
  // Example:
  // create({ title: "Project 1", description: "Description of Project 1" })
  // Returns: The created project as an object.
  create: async (data) => {
    "use server";
    return await prisma.project.create({
      data,
      include: {
        members: true,
        AdvisorRequest: true,
        GroupRequest: true,
      },
    });
  },
  // Parameters:
  // - id: String. Required. ID of the project to update.
  // - data: Object. Required. Data to update in the table.
  // Example:
  // update({ id: 1 }, { title: "Project 1" })
  // Returns: The updated project as an object.
  update: async (id, data) => {
    "use server";
    return await prisma.project.update({
      where: { id },
      data,
      include: {
        members: true,
        AdvisorRequest: true,
        GroupRequest: true,
      },
    });
  },
  // Parameters:
  // - id: String. Required. ID of the project to delete.
  // Example:
  // delete({ id: 1 }) will delete the project with id 1.
  // Returns: The deleted project as an object.
  delete: async (id) => {
    "use server";
    return await prisma.project.delete({
      where: { id },
      include: {
        members: true,
        AdvisorRequest: true,
        GroupRequest: true,
      },
    });
  },
};

// Interface to interact with the faculty table.
// Can be used on server side and client side as an server action.
export const faculty = {
  // Parameters:
  // - where: Object. Optional. Filters to apply to the query.
  // Example:
  // get({ id: 1 }) will return the faculty with id 1.
  // get({ firstName: "John" }) will return the faculty with first name "John".
  // get() will return all faculty.
  // Returns: Array of faculty.
  get: async (where = {}) => {
    "use server";
    return await prisma.faculty.findMany({
      where,
      include: {
        researchInterests: true,
        expertiseAreas: true,
        advisedProjects: true,
        coAdvisedProjects: true,
        skills: true,
      },
    });
  },
};
