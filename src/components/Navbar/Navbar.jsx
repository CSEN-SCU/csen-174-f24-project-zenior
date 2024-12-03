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

  // Define navigation links for different roles
  const studentLinks = [
    { label: "Projects", href: "/proposals" },
    { label: "Directory", href: "/advisor-directory" },
    { label: "Archive", href: "/archive" },
  ];

  const facultyLinks = [
    { label: "Projects", href: "/proposals" },
    { label: "Requests", href: "/requests" },
  ];

  const adminLinks = [
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "Manage Users", href: "/admin/users" },
    { label: "Archive", href: "/archive"},
  ];

  const superAdminLinks = [
    { label: "Super Admin Dashboard", href: "/superadmin/dashboard" },
    { label: "System Logs", href: "/superadmin/logs" },
    { label: "Global Settings", href: "/superadmin/settings" },
  ];

  let navLinks = [];
  if (role === "student") {
    navLinks = studentLinks;
  } else if (role === "faculty") {
    navLinks = facultyLinks;
  } else if (role === "admin") {
    navLinks = adminLinks;
  } else if (role === "super_admin") {
    navLinks = superAdminLinks;
  }

  return (
    <nav className="bg-[#b30738] text-white">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
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
        <div className="flex items-center space-x-4">
          {session
            ? navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  asChild
                  className="hover:text-[#9e1b32] transition-colors text-base font-medium"
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))
            : (
                <Login />
              )}
          {/* Profile or Sign-In Button */}
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={session.user.image || "/images/default-avatar.png"}
                  width={40}
                  height={40}
                  alt={session.user.name + " photo" || "default avatar"}
                  className="rounded-full transition duration-100 hover:opacity-80"
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
