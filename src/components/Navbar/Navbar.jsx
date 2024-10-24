"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <nav className="bg-[#b30738] text-white">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-3">
            <Image src="/images/square-whitetree-nobg.png" alt="Zenior logo" width={32} height={32} />
            <span className="text-2xl font-semibold">Zenior</span>
          </a>
        </div>

      <div className={`${styles.navbarMain} ${isOpen ? styles.showMenu : " "}`}>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/proposals" replace={true}>
              Project Proposals
            </Link>
          </li>
          <li>
            <Link href="/advisor-directory" replace={true}>
              Faculty Advisor Directory
            </Link>
          </li>
          <li>
            <Link href="/archive" replace={true}>
              Senior Design Archive
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
