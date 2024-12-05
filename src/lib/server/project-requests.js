"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const requestToJoinProject = async (projectId) => {
  const session = await auth();
  if (!session) return;

  const {
    id: userId,
    role,
    GroupRequest,
  } = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      GroupRequest: {
        where: {
          projectId,
        },
      },
    },
  });

  if (!userId || GroupRequest.length > 0) return;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (role === "faculty" && project.advisorId && project.coAdvisorId) {
    throw new Error("This project already has an advisor and a co-advisor.");
  }

  await prisma.GroupRequest.create({
    data: {
      projectId,
      userId,
    },
  });

  revalidatePath(`/proposals/${projectId}`);
  revalidatePath(`/my-team`);
};

export const withdrawRequestToJoinProject = async (projectId) => {
  const session = await auth();
  if (!session) return;

  const { id: userId } = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!userId) return;

  const request = await prisma.GroupRequest.findFirst({
    where: {
      projectId,
      userId,
    },
  });

  if (!request) return;

  await prisma.GroupRequest.delete({
    where: {
      id: request.id,
    },
  });

  revalidatePath(`/proposals/${projectId}`);
  revalidatePath(`/my-team`);
};

export const leaveProject = async (projectId) => {
  const session = await auth();
  if (!session) return;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      Student: true,
    },
  });

  if (!user) return;

  await prisma.ProjectMember.delete({
    where: {
      studentId_projectId: {
        studentId: user.Student.id,
        projectId,
      },
    },
  });

  // delete all projects that don't have any members, advisor, or coAdvisor
  const projects = await prisma.project.findMany({
    where: {
      members: {
        none: {},
      },
      advisorId: null,
      coAdvisorId: null,
    },
  });

  await prisma.project.deleteMany({
    where: {
      id: {
        in: projects.map((project) => project.id),
      },
    },
  });

  revalidatePath(`/proposals/${projectId}`);
  revalidatePath(`/my-team`);
};

export const actOnRequestToJoinProject = async (requestId, action) => {
  const session = await auth();
  if (!session) return;

  const request = await prisma.GroupRequest.findUnique({
    where: {
      id: requestId,
    },
    include: {
      user: {
        include: {
          Student: true,
          Faculty: true,
        },
      },
      project: true,
    },
  });

  if (!request) return;

  if (action === "accept") {
    if (request.user.Student) {
      await prisma.ProjectMember.create({
        data: {
          studentId: request.user.Student.id,
          projectId: request.projectId,
        },
      });
    } else if (request.user.Faculty) {
      const project = await prisma.project.findUnique({
        where: {
          id: request.projectId,
        },
      });
      if (project.advisorId) {
        await prisma.project.update({
          where: {
            id: request.projectId,
          },
          data: {
            coAdvisorId: request.user.Faculty.id,
          },
        });
      } else {
        await prisma.project.update({
          where: {
            id: request.projectId,
          },
          data: {
            advisorId: request.user.Faculty.id,
          },
        });
      }
    }
  }

  await prisma.GroupRequest.delete({
    where: {
      id: requestId,
    },
  });

  revalidatePath(`/proposals/${request.projectId}`);
  revalidatePath(`/my-team`);
};
