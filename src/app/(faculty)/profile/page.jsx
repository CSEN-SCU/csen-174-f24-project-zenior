import styles from "./profile.module.css";
import FacultyAccountForm from "@/components/FacultyAccountForm";
import { user } from "@/lib/server/actions";
import { auth } from "@/lib/auth";

export default async function Profile() {
  const session = await auth();
  const currentUser = await user.get({ email: session.user.email });

  // check if the user has completed account setup
  const isAccountComplete = currentUser[0]?.faculty?.department !== "";

  return (
    <main className={styles.container}>
      <FacultyAccountForm
        user={currentUser[0]}
        userUpdate={user.update}
        hideInstruction={isAccountComplete}
      />
      {/*  <StudentProjects user={currentUser[0]} /> */}
    </main>
  );
}
