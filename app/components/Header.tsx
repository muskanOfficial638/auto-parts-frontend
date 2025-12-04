/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { FiChevronDown } from "react-icons/fi";

export default function Header() {
  const router = useRouter();
  const [autoPartsUserData, setAutoPartsUserData] = useState<
    string | null | any
  >(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <>
      {/* HEADER */}
      <header
        className="fixed top-0 left-0 w-full z-20
  md:bg-black/50 md:backdrop-blur-md bg-black
  flex items-center justify-between
  md:px-8 lg:px-16 md:py-8 text-white p-[20px]"
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
          <ToastContainer />

          {/* Nav Links */}
          {!autoPartsUserData && (
            <nav className="hidden md:flex items-center space-x-10 text-white text-sm font-medium">
              <div className="relative group">
                <button className="hover:text-hoverblue flex items-center cursor-pointer">
                  Find Auto Parts
                  {/* <span className="ml-1">▾</span> */}
                </button>

                {/* Dropdown */}
                {/* <div className="absolute hidden group-hover:block bg-black/90 rounded-md mt-0 py-2 shadow-lg w-40">
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
            </div> */}
              </div>

              <a href="#" className="hover:text-hoverblue">
                About Us
              </a>
              <a href="#" className="hover:text-hoverblue">
                Contact
              </a>
            </nav>
          )}
        </div>

        {/* Buttons */}
        {!autoPartsUserData ? (
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white">
            <a href="/login" className="hover:text-hoverblue">
              Login
            </a>
            <a href="/sign-up" className="hover:text-hoverblue">
              Sign Up
            </a>
            <button
              onClick={() => toast.error("Please login to your account!")}
              className="bg-autoblue hover:bg-hoverblue text-white px-5 py-2 rounded-md transition"
            >
              Request Auto Parts
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-2">
            {autoPartsUserData?.user?.role === "buyer" && (
              <a
                href="/request-part"
                className="bg-autoblue hover:bg-hoverblue text-white px-5 py-2 rounded-md transition"
              >
                Request Auto Parts
              </a>
            )}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-[17px]"
            >
              <g clipPath="url(#clip0_450_974)">
                <path
                  d="M11.6666 17.5H8.33324C8.33324 17.9421 8.50883 18.366 8.82139 18.6786C9.13395 18.9911 9.55788 19.1667 9.9999 19.1667C10.4419 19.1667 10.8659 18.9911 11.1784 18.6786C11.491 18.366 11.6666 17.9421 11.6666 17.5ZM17.4366 15.3192C17.4997 15.1669 17.5161 14.9993 17.484 14.8376C17.4518 14.6759 17.3723 14.5274 17.2557 14.4109L15.8332 12.9884V8.33337C15.8306 6.93212 15.324 5.57858 14.406 4.51987C13.4881 3.46116 12.22 2.76791 10.8332 2.56671V1.66671C10.8332 1.44569 10.7454 1.23373 10.5892 1.07745C10.4329 0.921171 10.2209 0.833374 9.9999 0.833374C9.77889 0.833374 9.56693 0.921171 9.41065 1.07745C9.25437 1.23373 9.16657 1.44569 9.16657 1.66671V2.56671C7.77984 2.76791 6.51173 3.46116 5.59377 4.51987C4.67581 5.57858 4.16925 6.93212 4.16657 8.33337V12.9884L2.74407 14.4109C2.62756 14.5274 2.54822 14.6759 2.51608 14.8375C2.48394 14.9991 2.50045 15.1667 2.56351 15.3189C2.62656 15.4712 2.73335 15.6013 2.87035 15.6929C3.00736 15.7844 3.16844 15.8333 3.33324 15.8334H16.6666C16.8314 15.8334 16.9925 15.7846 17.1295 15.6931C17.2666 15.6015 17.3734 15.4714 17.4366 15.3192ZM14.6549 14.1667H5.3449L5.58907 13.9225C5.74536 13.7663 5.83319 13.5544 5.83324 13.3334V8.33337C5.83324 7.2283 6.27222 6.1685 7.05363 5.3871C7.83503 4.60569 8.89483 4.16671 9.9999 4.16671C11.105 4.16671 12.1648 4.60569 12.9462 5.3871C13.7276 6.1685 14.1666 7.2283 14.1666 8.33337V13.3334C14.1666 13.5544 14.2544 13.7663 14.4107 13.9225L14.6549 14.1667Z"
                  fill="#29B2FE"
                />
                <circle cx="15.5" cy="6.5" r="4.5" fill="#03CD21" />
                <path
                  d="M14.1405 8V7.52415L15.403 6.28658C15.5237 6.16465 15.6243 6.05634 15.7048 5.96165C15.7853 5.86695 15.8457 5.77521 15.8859 5.68643C15.9262 5.59766 15.9463 5.50296 15.9463 5.40234C15.9463 5.28752 15.9202 5.18928 15.8682 5.1076C15.8161 5.02474 15.7445 4.96082 15.6533 4.91584C15.5622 4.87086 15.4586 4.84837 15.3426 4.84837C15.223 4.84837 15.1183 4.87322 15.0283 4.92294C14.9384 4.97147 14.8685 5.04072 14.8188 5.13068C14.7703 5.22064 14.746 5.32777 14.746 5.45206H14.1192C14.1192 5.22124 14.1719 5.0206 14.2773 4.85014C14.3826 4.67969 14.5276 4.5477 14.7123 4.45419C14.8981 4.36068 15.1112 4.31392 15.3515 4.31392C15.5953 4.31392 15.8096 4.35949 15.9942 4.45064C16.1789 4.54178 16.3221 4.66667 16.4239 4.82528C16.5269 4.9839 16.5784 5.16501 16.5784 5.36861C16.5784 5.50473 16.5523 5.63849 16.5003 5.76989C16.4482 5.90128 16.3564 6.04687 16.2251 6.20668C16.0948 6.36648 15.912 6.56001 15.6764 6.78729L15.0496 7.42472V7.44957H16.6334V8H14.1405Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_450_974">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="matrix(-1 0 0 1 20 0)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="relative group">
              {/* User Button */}
              <button className="flex text-[15px] font-semibold leading-[14px] py-[5px] px-[10px] bg-black duration-400 cursor-pointer rounded-lg hover:text-hoverblue items-center">
                <Image
                  src="/fake-user.png"
                  alt="User"
                  width={32}
                  height={32}
                  className="w-[30px] h-[30px] rounded-full mr-[10px]"
                />
                {autoPartsUserData?.user?.name ? autoPartsUserData?.user?.name : autoPartsUserData?.user?.role}
                {/* <span className="ml-1">
                  <FiChevronDown
                    className={filtersOpen.a1 ? "rotate-180 text-[18px] text-[#D2D2D2]" : "text-[18px] text-[#D2D2D2]"}
                  />
                </span> */}
              </button>

              {/* Dropdown */}
              <div className="absolute right-[0] pt-[15px] hidden group-hover:block  shadow-lg w-44 ">
                {autoPartsUserData?.user?.role === "buyer" && (
                  <div className="px-4 py-3 text-sm border-b border-default">
                    <span className="block text-heading font-medium">
                      {autoPartsUserData?.user?.name}
                    </span>
                    <span className="block text-body break-all">
                      {autoPartsUserData?.user?.email}
                    </span>
                  </div>
                )}

                <ul className="py-[5px] px-[10px] text-xs leading-[31px] text-body font-medium bg-black/90 rounded-lg">
                  <li>
                    <a
                      href={
                        autoPartsUserData?.user?.role === "buyer"
                          ? "/buyer-dashboard"
                          : "/my-account"
                      }
                      className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue duration-400 border-[#242529] border-b rounded"
                    >
                      {autoPartsUserData?.user?.role === "buyer"
                        ? "Dashboard"
                        : "My Account"}
                    </a>
                  </li>
                  {autoPartsUserData?.user?.role === "supplier" && (
                    <li>
                      <a
                        href="/my-bids"
                        className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue duration-400 border-[#242529] border-b rounded"
                      >
                        My Bids
                      </a>
                    </li>
                  )}
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-800 hover:text-hoverblue rounded duration-400 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-white text-3xl"
        >
          ☰
        </button>
      </header>

      {/* MOBILE SLIDE-IN MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black/90 text-white z-50 transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="text-right p-5 text-3xl"
        >
          ✕
        </button>

        <div className="flex flex-col px-6 space-y-6 mt-4 text-lg">
          {/* Logged-Out Mobile Menu */}
          {!autoPartsUserData ? (
            <>
              <a href="/login" className="hover:text-hoverblue">
                Login
              </a>
              <a href="/sign-up" className="hover:text-hoverblue">
                Sign Up
              </a>
              <button
                onClick={() => toast.error("Please login to your account!")}
                className="bg-autoblue hover:bg-hoverblue w-full text-white px-5 py-2 rounded-md"
              >
                Request Auto Parts
              </button>

              <hr className="border-gray-700" />

              <a href="#" className="hover:text-hoverblue">
                Find Auto Parts
              </a>
              <a href="#" className="hover:text-hoverblue">
                About Us
              </a>
              <a href="#" className="hover:text-hoverblue">
                Contact
              </a>
            </>
          ) : (
            <>
              {/* User Info Mobile */}
              <div className="flex items-center space-x-3">
                <Image
                  src="/fake-user.png"
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {autoPartsUserData.user.user_name}
                  </p>
                  <p className="text-sm text-gray-300">
                    {autoPartsUserData.user.email}
                  </p>
                </div>
              </div>

              {autoPartsUserData?.user?.role === "buyer" && (
                <a
                  href="/request-part"
                  className="bg-autoblue hover:bg-hoverblue text-white px-5 py-2 rounded-md"
                >
                  Request Auto Parts
                </a>
              )}

              <hr className="border-gray-700" />

              <a
                href={
                  autoPartsUserData.user.role === "buyer"
                    ? "/buyer-dashboard"
                    : "/my-account"
                }
                className="hover:text-hoverblue"
              >
                {autoPartsUserData.user.role === "buyer"
                  ? "Dashboard"
                  : "My Account"}
              </a>

              {autoPartsUserData.user.role === "supplier" && (
                <a href="/my-bids" className="hover:text-hoverblue">
                  My Bids
                </a>
              )}

              <button
                onClick={handleLogout}
                className="hover:text-hoverblue text-left"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        ></div>
      )}

      <ToastContainer />
    </>
  );
}
