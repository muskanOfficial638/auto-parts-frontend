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
            <div className="w-[500px] relative  max-w-[100%] rounded-sm ">
              <div className="space-y-[32px]">
                <div className="max-w-fit mx-auto relative before:content-[''] before:absolute before:block before:h-full before:w-full before:bg-[#ffa600] before:blur-[36px]"><img src="/payment-cancelled-icon.svg" alt="Payment-Cancelled-icon" className="relative z-1" /></div>
                <h1 className="md:text-[28px] text-2xl leading-[36px] text-white font-semibold text-center">Payment Cancelled</h1>
              </div>
             
              <div className="bg-brandBlack text-center p-[20px] rounded-sm mt-[50px]">  
                <p className="text-sm leading-[22px] text-white">The payment was cancelled. If you have any questions, please contact support.</p>
                <div className="flex gap-[20px] mt-[30px]">
                  <button
                  type="submit"
                  className="bg-[#FFA600] w-full text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-[#DA8F02] duration-400 cursor-pointer"
                >
                  Retry Payment
                </button> 
                 <button
                  type="submit"
                  className="bg-autoblue w-full text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  Back to Dashboard
                </button> 
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
