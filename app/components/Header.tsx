/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [autoPartsUserData, setAutoPartsUserData] = useState<
    string | null | any
  >(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("autoPartsUserData");
      Promise.resolve().then(() => {
        setAutoPartsUserData(data ? JSON.parse(data) : null);
      });
    }
  }, []);

  function handleLogout() {
    if (autoPartsUserData) {
      localStorage.removeItem("autoPartsUserData");
      localStorage.clear();
      router.push("/login");
    }
  }

  return (
    <header
      className="fixed top-0 left-0 w-full z-20 
  bg-black/50 backdrop-blur-md
  flex items-center justify-between 
  px-8 lg:px-16 py-8"
    >
      <div className="flex flex-row space-x-10">
        {/* Logo */}
        <Link href="/" scroll={true} className="relative w-40 h-10">
          <Image
            src="/autoPartLogo.png"
            alt="Auto Parts XChange Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-10 text-white text-sm font-medium">
          <div className="relative group">
            <button className="hover:text-hoverblue flex items-center">
              Find Auto Parts <span className="ml-1">▾</span>
            </button>

            {/* Dropdown */}
            <div className="absolute hidden group-hover:block bg-black/90 rounded-md mt-0 py-2 shadow-lg w-40">
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue"
              >
                Engine
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue"
              >
                Brakes
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue"
              >
                Suspension
              </a>
            </div>
          </div>

          <a href="#" className="hover:text-hoverblue">
            About Us
          </a>
          <a href="#" className="hover:text-hoverblue">
            Contact
          </a>
        </nav>
      </div>

      {/* Buttons */}
      {!autoPartsUserData ? (
        <div className="flex items-center space-x-6 text-sm font-medium text-white">
          <a href="/login" className="hover:text-hoverblue">
            Login
          </a>
          <a href="/login" className="hover:text-hoverblue">
            Sign Up
          </a>
          <a
            href="#"
            className="bg-autoblue hover:bg-hoverblue text-white px-5 py-2 rounded-md transition"
          >
            Request Auto Parts
          </a>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <a
            href="#"
            className="bg-autoblue hover:bg-hoverblue text-white px-5 py-2 rounded-md transition"
          >
            Request Auto Parts
          </a>
          <div className="relative group">
            {/* User Button */}
            <button className="flex text-sm rounded-full hover:text-hoverblue items-center">
              <Image
                src="/fake-user.png"
                alt="User"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full mr-2"
              />
              {autoPartsUserData?.user?.role}
              <span className="ml-1">▾</span>
            </button>

            {/* Dropdown */}
            <div className="absolute right-[-5rem] hidden group-hover:block bg-black/90 rounded-base shadow-lg w-44 m-0">
              <div className="px-4 py-3 text-sm border-b border-default">
                <span className="block text-heading font-medium">
                  {autoPartsUserData?.user?.name}
                </span>
                <span className="block text-body break-all">
                  {autoPartsUserData?.user?.email}
                </span>
              </div>

              <ul className="p-2 text-sm text-body font-medium">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue rounded"
                  >
                    Dashboard
                  </a>
                </li>

                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-800 hover:text-hoverblue rounded"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
