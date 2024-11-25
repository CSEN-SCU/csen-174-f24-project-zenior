import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    {label: "Advisor Requests", href: "/requests"},
  ]

  const navLinks = role === "student" ? studentLinks : facultyLinks;

  return (
    <nav className="bg-[#b30738] text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center md:justify-between mx-auto px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center space-x-2">
          <a href="/" className="flex items-center space-x-2">
            <Image
              src="/images/square-whitetree-nobg.png"
              alt="Zenior Logo"
              width={42}
              height={42}
            />
            <span className="text-3xl font-semibold">Zenior</span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center space-x-4 mt-4 md:mt-0">
          <Link href="/proposals">
            <Button
              variant="ghost"
              className="hover:text-[#9e1b32] transition-colors text-base font-medium"
            >
              Projects
            </Button>
          </Link>
          <Link href="/advisor-directory">
            <Button
              variant="ghost"
              className="hover:text-[#9e1b32] transition-colors text-base font-medium"
            >
              Directory
            </Button>
          </Link>
          <Link href="/archive">
            <Button
              variant="ghost"
              className="hover:text-[#9e1b32] transition-colors text-base font-medium"
            >
              Archive
            </Button>
          </Link>
          {/* Profile or Sign-In Button */}
          {session ? (
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
                <Logout />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
