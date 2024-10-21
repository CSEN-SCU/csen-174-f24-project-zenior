import React from "react";
import styles from "./profile.module.css";
import StudentAccountForm from "@/components/StudentAccountForm";
import StudentProjects from "@/components/StudentProjects";
import { user } from "@/lib/server/actions";
import { auth } from "@/lib/auth";

export default async function MyTeam() {
  const session = await auth();
  const currentUser = await user.get({ email: session.user.email });
  return (
    <main className={styles.container}>
      <StudentAccountForm user={currentUser[0]} userUpdate={user.update} />
      <StudentProjects user={currentUser[0]} />
    </main>
  );
}
