"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [user] = useState({
    name: "John Doe",
    image: "/avatar.png", // Replace with dynamic user image
  });

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Promptopia Logo" width={40} height={40} />
        <h1 className="text-lg font-semibold ml-2">Promptopia</h1>
      </div>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Image
            src={user.image}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer border border-gray-300"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-white shadow-lg rounded-lg p-2"
        >
          {/* User Info */}
          <div className="flex items-center gap-3 p-3 border-b">
            <Image
              src={user.image}
              alt="User"
              width={35}
              height={35}
              className="rounded-full"
            />
            <span className="font-medium">{user.name}</span>
          </div>

          {/* Navigation Links */}
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="block px-3 py-2 hover:bg-gray-100 rounded-md"
            >
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/leaderboard"
              className="block px-3 py-2 hover:bg-gray-100 rounded-md"
            >
              Leaderboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/create-post"
              className="block px-3 py-2 hover:bg-gray-100 rounded-md"
            >
              Create Post
            </Link>
          </DropdownMenuItem>

          {/* Sign Out */}
          <DropdownMenuItem asChild>
            <button className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded-md">
              Sign Out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
