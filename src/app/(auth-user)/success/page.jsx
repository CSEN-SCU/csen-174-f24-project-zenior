import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const Success = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
  });
  if (!user) {
    redirect("/");
  }
  if (user.new) {
    redirect("/success/new-user");
  } else {
    redirect("/proposals");
  }
};

export default Success;
