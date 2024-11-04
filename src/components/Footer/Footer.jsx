"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const CustomFooter = () => {
  return (
    <footer className="bg-[#b30738] text-white py-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/square-whitetree-nobg.png" alt="Zenior Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Zenior</span>
          </Link>
        </div>

        <div className="flex space-x-8 text-sm">
          <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
          <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <a
            href="https://github.com/CSEN-SCU/csen-174-f24-project-zenior"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors flex items-center"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;

