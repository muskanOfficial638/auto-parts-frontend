"use client";

export default function MyAccountForm() {

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
              Account Details
            </h2>

            <form className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="text-gray-500 text-sm font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none"
                />
              </div>

              {/* Make */}
              <div>
                <label className="text-gray-500 text-sm font-semibold">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none"
                />
              </div>

              {/* Model */}
              <div>
                <label className="text-gray-500 text-sm font-semibold">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none"
                />
              </div>
              <h2 className="text-xl font-semibold text-white mb-8">
                Password
              </h2>
              {/* Trim */}
              <div>
                <label className="text-gray-500 text-sm font-semibold">
                  Old Password
                </label>
                <select className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none">
                  <option value=""></option>
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label className="text-gray-500 text-sm font-semibold">
                  New Password
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none"
                />
              </div>
              <div>
                <label className="text-gray-500 text-sm font-semibold">
                  Repeat New Password
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 bg-white border border-gray-700 rounded-md text-gray-700 outline-none"
                />
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
