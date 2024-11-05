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

const Navbar = async () => {
  const session = await auth();

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
          {/* Navigation Links */}
          <div className="hidden space-x-8 md:flex">
            <Link href="/proposals" className="hover:text-gray-300">
              Project Proposals
            </Link>
            <Link href="/advisor-directory" className="hover:text-gray-300">
              Faculty Advisor Directory
            </Link>
            <Link href="/archive" className="hover:text-gray-300">
              Senior Design Archive
            </Link>
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
                    <Link href="/myprofile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/my-team">My Team</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
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
