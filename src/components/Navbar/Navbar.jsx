"use client";

import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-[#b30738] text-white py-4 px-6 rounded-lg shadow-lg m-4">
      <div className="flex justify-between items-center">
        <a href="/" className="flex items-center">
          <Image
            src="/images/Logo.png"
            alt="ZENior logo"
            width={120}
            height={40}
            className="mr-2"
          />
        </a>

        <button
          className="text-white text-2xl md:hidden"
          onClick={toggleMenu}
        >
          &#9776;
        </button>

        {/* Navbar links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:justify-end items-center mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <Link href="/proposals" className="hover:text-gray-300 transition-colors">
                Project Proposals
              </Link>
            </li>
            <li>
              <Link href="/advisor-directory" className="hover:text-gray-300 transition-colors">
                Faculty Advisor Directory
              </Link>
            </li>
            <li>
              <Link href="/archive" className="hover:text-gray-300 transition-colors">
                Senior Design Archive
              </Link>
            </li>
            {session ? (
              <li>
                <Link
                  href="/account"
                  className="hover:text-gray-300 transition-colors"
                >
                  My Account
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-300 transition-colors"
                  onClick={() => signIn("google")}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
