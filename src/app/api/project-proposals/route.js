import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth"; 

export async function POST(request) {
  try {
    console.log("authOptions:", authOptions);
    const session = await getServerSession(authOptions); 

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = session.user;
    const { title, description, skills, majors } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        skills: { create: skills.map(skill => ({ name: skill })) },
        department: majors.join(", "),
        members: { create: { studentId: user.id, joinedAt: new Date() } },
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating project proposal:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
