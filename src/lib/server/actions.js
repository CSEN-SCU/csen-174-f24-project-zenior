import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
        members: {
          include: {
            student: true,
          },
        },
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
    const members = data.members;
    if (members) {
      delete data.members;
    }
    const newProject = await prisma.project.create({
      data,
      include: {
        members: true,
        AdvisorRequest: true,
        GroupRequest: true,
      },
    });
    if (members) {
      newProject.members = [];
      for (const member of members) {
        const newMember = await prisma.projectMember.create({
          data: {
            projectId: newProject.id,
            studentId: member.student.id,
          },
        });
        newProject.members.push(newMember);
      }
    }
    revalidatePath("/");
    revalidatePath("/my-team");
    redirect("/my-team");
    return newProject;
  },
  // Parameters:
  // - id: String. Required. ID of the project to update.
  // - data: Object. Required. Data to update in the table.
  // Example:
  // update({ id: 1 }, { title: "Project 1" })
  // Returns: The updated project as an object.
  update: async (id, data) => {
    "use server";
    const updatedProject = await prisma.project.update({
      where: { id },
      data,
      include: {
        members: true,
        AdvisorRequest: true,
        GroupRequest: true,
      },
    });
    revalidatePath("/");
    return updatedProject;
  },
  // Parameters:
  // - id: String. Required. ID of the project to delete.
  // Example:
  // delete({ id: 1 }) will delete the project with id 1.
  // Returns: The deleted project as an object.
  delete: async (id) => {
    "use server";
    const deletedProject = await prisma.project.delete({
      where: { id },
      include: {
        members: true,
        AdvisorRequest: true,
        GroupRequest: true,
      },
    });
    revalidatePath("/");
    return deletedProject;
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
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });
  },
};

export const user = {
  get: async (where = {}) => {
    "use server";
    const users = await prisma.user.findMany({
      where,
    });
    if (users.length > 0) {
      for (const user of users) {
        if (user.role === "faculty") {
          user.faculty = await prisma.faculty.findUnique({
            where: { userId: user.id },
            include: {
              researchInterests: true,
              expertiseAreas: true,
              advisedProjects: true,
              coAdvisedProjects: true,
              skills: {
                include: {
                  skill: true,
                },
              },
            },
          });
        } else {
          user.student = await prisma.student.findUnique({
            where: { userId: user.id },
            include: {
              skills: {
                include: {
                  skill: true,
                },
              },
              projects: true,
              AdvisorRequest: true,
              GroupRequest: true,
            },
          });
        }
      }
    }
    return users;
  },
  update: async (id, data) => {
    "use server";
    if (data.Student) {
      const student = await prisma.student.findUnique({
        where: { userId: id },
      });
      if (data.Student.skills) {
        for (const skill of data.Student.skills) {
          const existingSkill = await prisma.skill.findUnique({
            where: { name: skill },
          });
          if (existingSkill) {
            const existingStudentSkill = await prisma.studentSkill.findFirst({
              where: {
                studentId: student.id,
                skillId: existingSkill.id,
              },
            });
            if (!existingStudentSkill) {
              await prisma.studentSkill.create({
                data: {
                  studentId: student.id,
                  skillId: existingSkill.id,
                },
              });
            }
          } else {
            const newSkill = await prisma.skill.create({
              data: {
                name: skill,
              },
            });
            await prisma.studentSkill.create({
              data: {
                studentId: student.id,
                skillId: newSkill.id,
              },
            });
          }
        }
        const studentSkills = await prisma.studentSkill.findMany({
          where: { studentId: student.id },
          include: {
            skill: true,
          },
        });
        for (const studentSkill of studentSkills) {
          if (!data.Student.skills.includes(studentSkill.skill.name)) {
            console.log("deleting", studentSkill.skill.name);
            await prisma.studentSkill.delete({
              where: {
                studentId_skillId: {
                  studentId: student.id,
                  skillId: studentSkill.skillId,
                },
              },
            });
          }
        }
        delete data.Student.skills;
      }
      await prisma.student.update({
        where: { userId: id },
        data: data.Student,
      });
      delete data.Student;
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        new: data.new,
      },
    });
    if (updatedUser.role === "faculty") {
      updatedUser.faculty = await prisma.faculty.findUnique({
        where: { userId: id },
        include: {
          researchInterests: true,
          expertiseAreas: true,
          advisedProjects: true,
          coAdvisedProjects: true,
          skills: {
            include: {
              skill: true,
            },
          },
        },
      });
    } else {
      updatedUser.student = await prisma.student.findUnique({
        where: { userId: id },
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
          projects: true,
          AdvisorRequest: true,
          GroupRequest: true,
        },
      });
    }
    revalidatePath("/");
    return updatedUser;
  },
  delete: async (id) => {
    "use server";
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/");
    return deletedUser;
  },
};
