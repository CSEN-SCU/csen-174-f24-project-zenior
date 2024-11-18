import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { projects } from "@/lib/server/actions";

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
        Faculty: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = {
      title,
      description,
      department: majors.join(", "),
      isInterdisciplinary: majors.length > 1,
      academicYear: new Date().getFullYear().toString(),
      skills: skills.map((skill) => ({ name: skill })),
      groupOpen: true,
    };

    if (user.Student) {
      data.members = [user];
    }

    if (user.Faculty) {
      data.advisorId = user.Faculty.id;
    }

    const newProject = await projects.create(data);

    revalidatePath("/proposals");
    return NextResponse.json({ newProject });
  } catch (error) {
    console.error("Error creating project proposal:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
