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

        {/* Right Section: Navigation Links and Profile/Sign-In */}
        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/proposals" className="hover:text-gray-300">Project Proposals</Link>
            <Link href="/advisor-directory" className="hover:text-gray-300">Faculty Advisor Directory</Link>
            <Link href="/archive" className="hover:text-gray-300">Senior Design Archive</Link>
          </div>

          {/* Profile or Sign-In Button */}
          <div className="relative">
            {session ? (
              <>
                <button onClick={toggleDropdown} className="flex items-center">
                  <Image
                    src={session.user.image || "/images/default-avatar.png"}
                    alt="user photo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg dark:bg-gray-700">
                    <div className="px-4 py-3">
                      <span className="block text-sm font-medium">{session.user.name}</span>
                      <span className="block text-sm text-gray-500 truncate">{session.user.email}</span>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">Settings</Link>
                      </li>
                      <li>
                        <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <button onClick={() => signIn("google")} className="hover:text-gray-300">Login</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
