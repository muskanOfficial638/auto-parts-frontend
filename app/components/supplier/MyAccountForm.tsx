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
          <div className="w-[1037px] max-w-[100%] bg-[#12151B] rounded-sm px-[30px] pt-[20px] pb-[60px]">
            <div className="w-[808px] max-w-[100%] ms-[auto] me-[auto]">
            <h2 className="md:text-[23px] text-text-lg leading-[36px] font-semibold text-white mb-[27px]">
              Account Details
            </h2>
            <form className="space-y-[28px]">
              {/* Product Name */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none"
                />
              </div>

              {/* Make */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none"
                />
              </div>

              {/* Model */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none"
                />
              </div>
              <h2 className="md:text-[23px] text-text-lg leading-[36px] font-semibold text-white md:mb-[27px] mb-[15px] md:mt-[46px] mt-[30px] ">
                Password
              </h2>
              {/* Trim */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Old Password
                </label>
                <select className="w-full py-[8px] text-[#6C7275] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none">
                  <option value=""></option>
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  New Password
                </label>
                <input
                  type="text"
                  className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none"
                />
              </div>
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Repeat New Password
                </label>
                <input
                  type="text"
                  className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="bg-[#1DA1F2] md:text-[22px] text-base leading[14px] w-full rounded-sm text-white md:py-[20px] p-[13px] font-semibold hover:bg-[#1a8cd8] duration-400 cursor-pointer"
              >
                Save Changes
              </button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
