import React from "react";
import styles from "./profile.module.css";
import Account from "@/components/Account";

export default function MyTeam() {
  return (
    <div className={styles.container}>
      <Account />
    </div>
  );
}
