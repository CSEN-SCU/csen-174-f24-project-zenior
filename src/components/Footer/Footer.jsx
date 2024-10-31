"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const CustomFooter = () => {
  return (
    <footer className="bg-[#b30738] text-white py-4">
      <div className="flex flex-col items-center px-6 mx-auto space-y-2 max-w-screen-xl md:flex-row md:justify-between md:space-y-0">
        {/* Logo and Copyright */}
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center">
            <Image
              src="/images/square-whitetree-nobg.png"
              alt="Zenior Logo"
              width={40}
              height={40}
            />
          </a>
          <p className="text-sm font-semibold">
            &copy; {new Date().getFullYear()} Zenior
          </p>
        </div>

        {/* Links */}
        <div className="flex space-x-4">
          <Link href="/about" className="transition-colors hover:text-gray-300">
            About
          </Link>
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-gray-300"
          >
            Privacy Policy
          </Link>
          <a
            href="https://github.com/CSEN-SCU/csen-174-f24-project-zenior"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-300"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
