"use client";

import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  //manage menu visibility
  const [isOpen, setIsOpen] = useState(false);

  //toggle the menu open/closed
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <a href="/" className={styles.logo}>
          <Image
            src="/images/Logo.png"
            alt="ZENior logo"
            width={150}
            height={50}
          />
        </a>
      </div>
      <button className={styles.hamburger} onClick={toggleMenu}>
        &#9776;
      </button>

      <div className={`${styles.navbarMain} ${isOpen ? styles.showMenu : " "}`}>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/student-proposals" replace={true}>
              Student Project Proposals
            </Link>
          </li>
          <li>
            <Link href="/faculty-proposals" replace={true}>
              Faculty Advisor Project Proposals
            </Link>
          </li>
          <li>
            <Link href="/advisor-directory" replace={true}>
              Faculty Advisor Directory
            </Link>
          </li>
          <li>
            <Link href="/my-team" replace={true}>
              My Project and Team
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
