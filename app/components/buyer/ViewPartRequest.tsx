"use client";

import Image from "next/image";

export default function ViewPartRequest() {
  return (
    <div className="min-h-screen w-full relative">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />

      {/* Page Content */}
      <div className="relative z-10 flex justify-center pt-36 pb-20 px-4">

        <div className="w-full max-w-5xl bg-[#12151B] rounded-lg shadow-lg border border-gray-800 p-8">

          {/* Header (Image + Title + Button) */}
          <div className="flex justify-between">
            <div className="flex gap-5">
              <div className="w-28 h-28 bg-black rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="/productImage.png"
                  alt="Filter"
                  width={120}
                  height={120}
                  className="object-cover rounded"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="text-2xl text-white font-semibold flex gap-2 items-center">
                  Filter Air Cleaner
                  <span className="px-2 py-1 bg-green-600/80 text-white text-xs rounded">
                    New
                  </span>
                </h1>

                <p className="text-gray-200 text-sm">
                  Air Filter for Mahindra Scorpio N, Thar 2nd Gen
                </p>

                <p className="text-gray-400 text-sm mt-2">BMW A1 • Trim</p>
                <p className="text-gray-200 text-sm">
                  Required By:{" "}
                  <span className="text-white font-medium">20/11/2015</span>
                </p>
              </div>
            </div>

            <button className="text-autoblue rounded-md hover:border-hoverblue">
                <span className="border border-autoblue p-4">Mark as Completed</span>
            </button>
          </div>

          {/* QUOTES LIST */}
          <div className="space-y-5 mt-4">

            {/* === Quote Box Component === */}
            {[1, 2, 3].map((quote, index) => (
              <div
                key={quote}
                className="bg-[#011827] border border-[#153C51] rounded-md p-5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-semibold">@Jam Corse</p>
                    <p className="text-gray-200 text-sm">jam.corse9@gmail.com</p>

                    <p className="text-gray-300 mt-3 text-sm">
                      <span className="font-semibold text-gray-400">Price:</span>{" "}
                      <span className="text-autoblue">$200.00</span>
                    </p>

                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold text-gray-400">
                        Delivery Date:
                      </span>{" "}
                      12/12/2025
                    </p>

                    <p className="text-gray-300 text-sm mt-2">
                      <span className="font-semibold text-gray-400">
                        Description:
                      </span>{" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt.
                    </p>
                  </div>

                  {/* Right-Side Buttons */}
                  <div className="flex items-center gap-3">
                    {index === 0 ? (
                      <div className="bg-autoblue px-5 py-2 text-white rounded-md">
                        Accepted
                      </div>
                    ) : (
                      <>
                        <button className="bg-green-600 px-5 py-2 text-white rounded-md hover:bg-green-700 cursor-pointer">
                          Accept
                        </button>
                        <button className="bg-red-600 px-5 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer">
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
