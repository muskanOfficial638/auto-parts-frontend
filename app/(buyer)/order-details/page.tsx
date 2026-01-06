import { Suspense } from "react";
import RequestPartForm from "../../components/buyer/RequestPartForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function RequestPartPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen w-full relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
          />
          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" /> */}
          {/* Page Content */}

          <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95"></div>
          <div className="flex flex-col justify-center items-center pt-36 pb-20 px-4">
            <div className="w-[830px] relative  max-w-[100%] rounded-sm ">
              <div className="flex justify-between">
                <h2 className="text-[26px] font-bold leading-[14px]">Order Details</h2>
                <button
                  type="submit"
                  className="bg-autoblue text-white text-base leading[14px] rounded-sm text-white py-[13px] px-[20px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  Back To Order
                </button>
              </div>
              <div className="bg-brandBlack py-[20px] px-[28px] rounded-sm mt-[20px]">
                <div className="flex gap-2">
                  <p className="text-sm leading-[22px] font-bold text-white">Order ID:
                    <span className=" ms-[5px] font-medium text-[#B9B9B9]">OR-20451</span>
                  </p>
                  <a href="#" className="bg-[#6BB776] px-[13px] py-[3px] rounded-[3px] text-xs leading-[14px">Accepted</a>
                </div>
                <div className="bg-[#011827] p-[10px] rounded-sm">
                  <a href="#"><img src="" alt="" />@Muikan Supplier</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
      <Footer />
    </main>
  );
}
