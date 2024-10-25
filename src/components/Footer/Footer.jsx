"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const CustomFooter = () => {
  return (
    <footer className="bg-[#b30738] text-white py-4 px-4 rounded-lg shadow-lg m-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Copyright Section */}
        <div className="flex items-center space-x-2">
          <a href="#" className="flex items-center">
            <Image
              src="/images/Logo.png"
              alt="Zenior Logo"
              width={80}
              height={24}
              className="mr-2"
            />
          </a>
          <p className="text-white/70 font-bold text-sm hover:text-white transition-colors">
            © {new Date().getFullYear()} Zenior
          </p>
        </div>

        {/* Link Group */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="#"
            className="text-white hover:text-gray-300 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="https://github.com/CSEN-SCU/csen-174-f24-project-zenior"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
