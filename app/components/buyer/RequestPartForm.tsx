"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

export default function RequestPartForm() {
  const [date, setDate] = useState("");

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
  <div className="relative z-10 flex flex-col">
    <div className="flex justify-center items-start pt-36 pb-20 px-4">
        <div className="w-full max-w-3xl bg-[#12151B] rounded-lg p-10 shadow-xl border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-8">
            Request a Part
          </h2>

          <form className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="text-gray-500 text-sm font-semibold">
                Product Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none"
              />
            </div>

            {/* Make */}
            <div>
              <label className="text-gray-500 text-sm font-semibold">
                Make
              </label>
              <select className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none">
                <option value=""></option>
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="text-gray-500 text-sm font-semibold">
                Model
              </label>
              <select className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none">
                <option value=""></option>
              </select>
            </div>

            {/* Trim */}
            <div>
              <label className="text-gray-500 text-sm font-semibold">
                Trim
              </label>
              <select className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none">
                <option value=""></option>
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label className="text-gray-500 text-sm font-semibold">
                Urgency
              </label>
              <input
                type="text"
                className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none"
              />
            </div>

            {/* Required Date */}
            <div>
              <label className="text-gray-500 text-sm font-semibold">
                Required
              </label>

              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none"
                />
                <CalendarDays
                  className="absolute right-3 top-4 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm font-semibold">
                Image
              </label>

              <button
                type="button"
                className="px-4 py-2 w-36 mt-2 rounded-md border border-autoblue text-autoblue hover:border-hoverblue transition cursor-pointer"
              >
                Browse image
              </button>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-autoblue hover:bg-hoverblue text-white p-3 rounded-md text-lg font-medium mt-6 cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
  </div>

</div>

    
  );
}
