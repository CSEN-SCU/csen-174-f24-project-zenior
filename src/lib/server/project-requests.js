"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const requestToJoinProject = async (projectId) => {
  const session = await auth();
  if (!session) return;

  const { id: userId, GroupRequest } = await prisma.user.findUnique({
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
