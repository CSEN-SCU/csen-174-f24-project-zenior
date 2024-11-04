import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const Success = async () => {
  const session = await auth();
  const userEmail = session?.user?.email;

  let user = await prisma.user.findUnique({
    where: { email: userEmail },
  });


  if (!user) {
    user = await prisma.user.create({
      data: {
        email: userEmail,
        role: "student", // Default to student for new users
        new: true,       
      },
    });
  }

  // Redirect new users to the profile setup page
  if (user.new) {
    redirect("/success/new-user");
  } else {
    // Redirect based on the user's role if not a new user
    switch (user.role) {
      case "student":
        redirect("/student");
        break;
      case "faculty":
        redirect("/faculty");
        break;
      case "admin":
        redirect("/admin");
        break;
      case "super_admin":
        redirect("/super_admin");
        break;
      default:
        redirect("/"); 
        break;
    }
  }
};

export default Success;
