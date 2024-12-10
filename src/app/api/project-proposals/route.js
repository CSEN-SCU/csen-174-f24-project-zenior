import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { projects } from "@/lib/server/actions";
import { requestToJoinProject } from "@/lib/server/project-requests";
import { requestToAdvise } from "@/lib/server/advisor-requests";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session && !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const { title, description, skills, majors, projectMem, projectAd } =
      await request.json();

    const members = projectMem.split(",").map((email) => email.trim());
    const advisors = projectAd.split(",").map((email) => email.trim());

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

    members.map(async (email) => {
      // add request
      console.log(email);
    });

    advisors.map(async (email) => {
      const faculty = await prisma.user.findUnique({
        where: { email },
        include: {
          Faculty: true,
        },
      });

      if (!faculty || !faculty.Faculty) {
        return;
      }

      await requestToAdvise(user.Student.id, newProject.id, faculty.Faculty.id);
    });

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
