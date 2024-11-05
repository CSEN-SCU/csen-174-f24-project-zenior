import React from "react"; 
import StudentOverview from "@/components/StudentOverview";
import StudentAccountForm from "@/components/StudentAccountForm";
import { Checklist } from "@/components/Checklist";
import styles from "@/styles/profile.module.css"; 
import { user } from "@/lib/server/actions";
import { auth } from "@/lib/auth";

export default async function MyTeam() {
  const session = await auth();
  const currentUser = await user.get({ email: session.user.email });

  // check if the user has completed account setup
  const isAccountComplete = currentUser[0]?.student?.major !== "";

  return (
    <main className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.formContainer}>
          <StudentAccountForm
            user={currentUser[0]}
            userUpdate={user.update}
            hideInstruction={isAccountComplete}
          />
        </div>

        {isAccountComplete && (
          <div className={styles.progressContainer}>
            <Checklist />
          </div>
        )}
      </div>

      {/*  <StudentProjects user={currentUser[0]} /> */}
      {isAccountComplete && (
        <div className={styles.rightContainer}>
          <StudentOverview user={currentUser[0]} />
        </div>
      )}
    </main>
  );
}
