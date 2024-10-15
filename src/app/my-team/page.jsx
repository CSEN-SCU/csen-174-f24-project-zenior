"use client";

import React from "react";
import styles from "./profile.module.css";
import StudentAccountForm from "@/components/StudentAccountForm/StudentAccountForm";

//export default function Team() {
//  return <h1> My team </h1>;
//}

export default function Account() {
  return (
    <div className={styles.container}>
      <StudentAccountForm />
    </div>
  );
}
