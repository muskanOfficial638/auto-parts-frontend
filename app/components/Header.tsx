/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { FaRegBell } from "react-icons/fa";

function MainNav() {
  return (
    <>
      <div className="flex flex-row space-x-8">
        {/* Logo */}
        <Link href="/" scroll={true} className="relative w-40 h-10">
          <Image
            src="/autoPartLogo.svg"
            alt="Auto Parts XChange Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <ToastContainer />

        <nav className="hidden lg:flex items-center space-x-[25px] text-white text-sm font-medium">
          <div className="relative group">
            <button className="hover:text-hoverblue text-[17px] duration-400 font-semibold leading-[15px] flex items-center cursor-pointer">
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

          <Link
            href="#"
            className="hover:text-hoverblue text-[17px] duration-400 font-semibold leading-[15px]"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="hover:text-hoverblue text-[17px] duration-400 font-semibold leading-[15px]"
          >
            Contact
          </Link>
        </nav>
      </div>
      <div className="hidden lg:flex items-center space-x-[22px] text-[17px]  font-semibold leading-[15px] text-white">
        <Link
          href="/login"
          className="bg-autoblue leading-[19px] font-semibold text-base hover:bg-hoverblue text-white px-[18px] py-[12px] cursor-pointer rounded-sm duration-400"
        >
          Request Auto Parts
        </Link>
        <Link
          href="/login"
          className=" leading-[19px] font-semibold text-base hover:text-hoverblue text-white px-[18px] py-[12px] cursor-pointer rounded-sm duration-400"
        >
          Login
        </Link>
      </div>
    </>
  );
}

function BuyerSupplierMenu({ autoPartsUserData }: { autoPartsUserData: any }) {
  const router = useRouter();
  function handleLogout() {
    if (autoPartsUserData) {
      router.push("/logout");
    }
  }
  function setIsPopupOpen(arg0: (prev: any) => boolean): void {
    throw new Error("Function not implemented.");
  }

  const [isPopupOpenNoti, setIsPopupOpenNoti] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click + ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpenNoti(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPopupOpenNoti(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return (
    <>
      <div className="flex flex-row space-x-8">
        {/* Logo */}
        <Link href="/" scroll={true} className="relative w-40 h-10">
          <Image
            src="/autoPartLogo.svg"
            alt="Auto Parts XChange Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <div className=" lg:flex lg:ms-0 ms-auto items-center space-x-[17px]">
        {autoPartsUserData?.role === "buyer" && (
          <Link
            href="/request-part"
            className="lg:block hidden bg-autoblue leading-[19px] font-semibold text-base hover:bg-hoverblue text-white px-[18px] py-[12px] cursor-pointer rounded-sm duration-400"
          >
            Request Auto Parts
          </Link>
        )}
        <div className="relative">
          <div
            className="relative cursor-pointer"
            onClick={() => setIsPopupOpenNoti((prev) => !prev)}
          >
            <FaRegBell className="text-autoblue text-[22px]" />
            <span className="bg-[#03CD21] text-[8px] h-3.75 w-3.75 rounded-full flex items-center justify-center absolute top-0 -right-[6px]">
              2
            </span>
          </div>
          {/* 🪟 Popup Panel */}
          <div
            ref={popupRef}
            className={`absolute md:top-9.5 top-11.75 md:-right-4 -right-8.25 w-62.5 transition-all duration-300 ${
              isPopupOpenNoti
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
            }`}
          >
            <div className="relative bg-brandBlack rounded-[10px] shadow-2xl py-5 px-3.75">
              {/* Arrow */}
              <div className="absolute -top-1.75 right-5  w-5 h-5 bg-brandBlack rotate-45 "></div>

              <div className="space-y-2.5">
                {[1, 2, 3].map((item) => (
                  <div key={item}>
                    <h3 className="text-autoblue text-[13px] font-semibold">
                      Transaction Confirmed
                    </h3>
                    <p className="text-white text-[10px] mt-1">
                      Your payment was successfully deposited into escrow. 290
                      DAI
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group lg:block hidden">
          <button className="flex text-[15px] font-semibold leading-[14px] py-[5px] px-[10px] bg-black duration-400 cursor-pointer rounded-lg hover:text-hoverblue items-center">
            <Image
              src="/fake-user.png"
              alt="User"
              width={32}
              height={32}
              className="w-[30px] h-[30px] rounded-full mr-[10px]"
            />
            {autoPartsUserData?.user_name
              ? autoPartsUserData?.user_name
              : autoPartsUserData?.role}
            <span className="ml-[10px]">
              {" "}
              <Image
                src="/dropdown.svg"
                alt="dropdown"
                width={10}
                height={6}
                className="w-[10px] h-[6px]"
              />
            </span>
          </button>

          <div className="absolute bg-black/90 rounded-lg py-[5px] px-[10px] right-[0] pt-[15px] hidden group-hover:block  shadow-lg w-44 ">
            <ul className=" text-xs leading-[31px] text-body font-medium ">
              <li>
                <Link
                  href={
                    autoPartsUserData?.role === "buyer"
                      ? "/buyer-dashboard"
                      : "/supplier-dashboard"
                  }
                  className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue duration-400 border-Dark border-b rounded"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/my-account"
                  className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue duration-400 border-Dark border-b rounded"
                >
                  My Account
                </Link>
              </li>

              {autoPartsUserData.role === "buyer" && (
                <li>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue duration-400 border-Dark border-b rounded"
                  >
                    Orders
                  </Link>
                </li>
              )}

              {/* {autoPartsUserData?.role === "supplier" && (
                <li>
                  <Link
                    href="/my-quote"
                    className="block px-4 py-2 hover:bg-gray-800 hover:text-hoverblue duration-400 border-Dark border-b rounded"
                  >
                    My Quote
                  </Link>
                </li>
              )} */}
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
    </>
  );
}
export default function Header() {
  const [autoPartsUserData] = useState(() => {
    if (typeof window === "undefined") return null;

    const data = localStorage.getItem("autoPartsUserData");
    return data ? JSON.parse(data) : null;
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();
  function handleLogout() {
    if (autoPartsUserData) {
      router.push("/logout");
    }
  }

  return (
    <>
      {/* HEADER */}
      <header
        className="fixed top-0  left-0 w-full z-10
  lg:bg-black/50 lg:backdrop-blur-md bg-black
  
   lg:py-8 py-[20px] text-white"
      >
        <div className="container flex items-center justify-between">
          {!autoPartsUserData ? (
            <MainNav />
          ) : (
            <BuyerSupplierMenu autoPartsUserData={autoPartsUserData} />
          )}
          
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white text-3xl"
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE-IN MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black/90 text-white z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
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
              <Link href="/login" className="hover:text-hoverblue">
                Login
              </Link>
              <button
                onClick={() => toast.error("Please login to your account!")}
                className="bg-autoblue leading-[19px] font-semibold text-base hover:bg-hoverblue text-white px-[18px] py-[12px] cursor-pointer rounded-sm duration-400"
              >
                Request Auto Parts
              </button>

              <hr className="border-gray-700" />

              <Link href="#" className="hover:text-hoverblue">
                Find Auto Parts
              </Link>
              <Link href="#" className="hover:text-hoverblue">
                About Us
              </Link>
              <Link href="#" className="hover:text-hoverblue">
                Contact
              </Link>
            </>
          ) : (
            <>
              {/* User Info Mobile */}
              <div className="flex items-center space-x-[17px]">
                <Image
                  src="/fake-user.png"
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {autoPartsUserData?.user_name}
                  </p>
                </div>
              </div>

              {autoPartsUserData?.role === "buyer" && (
                <Link
                  href="/request-part"
                  className="bg-autoblue leading-[19px] font-semibold text-base hover:bg-hoverblue text-white px-[18px] py-[12px] cursor-pointer rounded-sm duration-400"
                >
                  Request Auto Parts
                </Link>
              )}

              <hr className="border-gray-700" />

              <Link
                href={
                  autoPartsUserData?.role === "buyer"
                    ? "/buyer-dashboard"
                    : "/supplier-dashboard"
                }
                className="hover:text-hoverblue"
              >
                Dashboard
              </Link>
              <Link href="/my-account" className="hover:text-hoverblue">
                My Account
              </Link>

              {autoPartsUserData.role === "buyer" && (
                <Link href="/orders" className="hover:text-hoverblue">
                  Orders
                </Link>
              )}
              {autoPartsUserData.role === "supplier" && (
                <Link href="/my-bids" className="hover:text-hoverblue">
                  My Bids
                </Link>
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
