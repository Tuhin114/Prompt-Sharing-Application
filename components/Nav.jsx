"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full bg-white py-3  border-b-[1px] border-gray-300">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden items-center gap-5">
        {session?.user ? (
          <>
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full cursor-pointer border border-gray-300"
                  alt="profile"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white shadow-lg rounded-lg p-2"
              >
                <DropdownMenuItem asChild>
                  <div className="flex gap-2">
                    <Image
                      src={session?.user.image}
                      width={37}
                      height={37}
                      className="rounded-full cursor-pointer border border-gray-300"
                      alt="profile"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium leading-none text-gray-700">
                        {session?.user.name}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                  >
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/leaderboard"
                    className="block px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                  >
                    Leader Board
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={signOut}
                    className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded-md"
                  >
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
                alt="profile"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white shadow-lg rounded-lg p-2"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="block px-3 py-2 hover:bg-gray-100 rounded-md"
                >
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/create-prompt"
                  className="block px-3 py-2 hover:bg-gray-100 rounded-md"
                >
                  Create Post
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  onClick={signOut}
                  className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-100 rounded-md"
                >
                  Sign Out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
