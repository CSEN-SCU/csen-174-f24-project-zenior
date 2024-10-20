"use client";

import React from "react";
import styles from "./profile.module.css";
import Account from "./createaccount/page"; 

//export default function Team() {
//  return <h1> My team </h1>;
//}

export default function MyTeam() {
  return (
    <div className={styles.container}>
      <Account />
    </div>
  );
}
