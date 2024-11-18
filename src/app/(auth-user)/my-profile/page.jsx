import styles from "@/styles/profile.module.css";
import AccountForm from "@/components/AccountForm/Form";
import { user } from "@/lib/server/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const MyProfile = async () => {
  const session = await auth();
  const users = await user.get({ email: session.user.email });

  if (!session || !users) {
    redirect("/");
  }

  const isAccountComplete = users[0].new;

  return (
    <main className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.formContainer}>
          <AccountForm
            user={users[0]}
            userUpdate={user.update}
            hideInstruction={!isAccountComplete}
          />
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
