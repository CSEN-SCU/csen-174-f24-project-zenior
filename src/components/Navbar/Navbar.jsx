import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Login, Logout } from "@/components/Navbar/AuthButtons";

const Navbar = async() => {
  const session = await auth();

  const role = session?.user?.role;

  const studentLinks = [
    {label: "Project Proposals", href:"/proposals"},
    {label: "Faculty Advisor Directory", href:"/advisor-directory"},
    {label: "Senior Design Archive", href: "/archive"},
  ];

  const facultyLinks = [
    {label: "Project Proposals", href:"/proposals"},
    {label: "My Advisees", href: "/advisees"},
  ]

  const navLinks = role === "student" ? studentLinks : facultyLinks;

  return (
    <nav className="bg-[#b30738] text-white">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6 py-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center -my-2 space-x-3">
            <Image
              src="/images/square-whitetree-nobg.png"
              alt="Zenior logo"
              width={58}
              height={58}
            />
            <span className="font-semibold tracking-wide text-[1.9rem]/none">
              ZEN
              <br />
              <span className="text-4xl/none">IOR</span>
            </span>
          </a>
        </div>

        <div className="flex items-center space-x-8">
          <div className="hidden space-x-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="list-none">
                <Link href={link.href} className="hover:text-gray-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </div>
          {/* Profile or Sign-In Button */}
          {session ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image
                    src={session.user.image || "/images/default-avatar.png"}
                    width={40}
                    height={40}
                    alt={session.user.name + " photo" || "default avatar"}
                    className="rounded-full transition duration-100 grayscale hover:grayscale-0"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>
                    <span className="block text-sm font-medium">
                      {session.user.name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate">
                      {session.user.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/my-profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/my-team">My Team</Link>
                  </DropdownMenuItem>
                  {/*
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  */}
                  <Logout />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
