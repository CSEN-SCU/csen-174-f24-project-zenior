import StudentAccountForm from "@/components/StudentAccountForm";
import { user } from "@/lib/server/actions";
import { auth } from "@/lib/auth";

const NewUserForm = async () => {
  const session = await auth();
  const newUser = await user.get({ email: session.user.email });
  return <StudentAccountForm user={newUser[0]} userUpdate={user.update} />;
};

export default NewUserForm;
