import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session && !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const { title, description, skills, majors } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        Student: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const academicYear = new Date().getFullYear().toString();

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        department: majors.join(", "),
        isInterdisciplinary: majors.length > 1,
        academicYear,
      },
      include: {
        members: true,
        AdvisorRequest: true,
        GroupRequest: true,
      },
    });

    const newMember = await prisma.projectMember.create({
      data: {
        projectId: newProject.id,
        studentId: user.Student.id,
      },
    });
    newProject.members.push(newMember);

    return NextResponse.json({ newProject });
  } catch (error) {
    console.error("Error creating project proposal:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
