import AccountForm from "@/components/AccountForm/Form";
import { user, skill } from "@/lib/server/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const NewUserForm = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const users = await user.get({ email: session.user.email });
  const allSkills = await skill.get();
  if (!users[0].new) {
    redirect("/student/page.jsx");
  }
  return (
    <AccountForm user={users[0]} userUpdate={user.update} skills={allSkills} />
  );
};

export default NewUserForm;
