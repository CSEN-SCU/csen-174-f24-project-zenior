"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const CustomFooter = () => {
  return (
    <footer className="bg-[#b30738] text-white py-4">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:justify-between px-6">
        {/* Logo and Copyright */}
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center">
            <Image src="/images/square-whitetree-nobg.png" alt="Zenior Logo" width={40} height={40} />
          </a>
          <p className="text-sm font-semibold">© {new Date().getFullYear()} Zenior</p>
        </div>

        {/* Links */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition-colors">About</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <a
            href="https://github.com/CSEN-SCU/csen-174-f24-project-zenior"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
