import AccountForm from "@/components/AccountForm/Form";
import { user } from "@/lib/server/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const NewUserForm = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }
  const users = await user.get({ email: session.user.email });
  if (!users[0].new) {
    redirect("/my-team");
  }
  return <AccountForm user={users[0]} userUpdate={user.update} />;
};

export default NewUserForm;
