"use client";
import { Suspense, useState } from "react";
import Image from "next/image";
import { useParams } from 'next/navigation';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { useEffect } from "react";
import { fetchOrdersByID, imagePath } from "@/app/utils/api";




export default function RequestPartPage() {
  const [OrderDetails, setOrderDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const orderid = params.orderid as string;


  // Load on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (!loggedInUser?.access_token) return;

      const data = await fetchOrdersByID(
        orderid,
        loggedInUser.access_token
      );
      setOrderDetails(data);
      setLoading(false);
    };
    loadInitialData();
  }, [orderid]);



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

          <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95"></div>
          <div className="flex flex-col justify-center items-center pt-36 pb-20 px-4">
            <div className="w-[830px] relative  max-w-[100%] rounded-sm ">
              <div className="flex justify-between items-center">
                <h2 className="md:text-[26px] text-[20px] font-bold leading-[14px]">Order Details </h2>
                <button
                  type="submit"
                  className="bg-autoblue text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  Back To Order
                </button>
              </div>
              <div className="bg-brandBlack md:py-[20px] md:px-[28px] p-[20px] rounded-sm mt-[20px]">
                <div className="flex gap-2">
                  <p className="text-sm leading-[22px] font-bold text-white">Order ID:
                    <span className=" ms-[5px] font-medium text-[#B9B9B9]">{OrderDetails?.order_id}</span>
                  </p>
                  <span className="bg-[#6BB776] px-[13px] py-[3px] rounded-[3px] text-xs leading-[14px]">Accepted</span>
                </div>
                <div className="bg-[#011827] p-[10px] rounded-sm mt-[25px] border-[#153C51] border">
                  <a href="#" className="flex text-[13px] font-semibold leading-[16px] items-center gap-[8px]">
                    <Image width={23}
                      height={32} src="/user-icon.svg" alt="user icon" />@Muikan Supplier</a>
                  <a href="#" className="flex items-center text-[13px] font-semibold leading-[16px] gap-[8px] mt-[10px]">
                    <Image width={23}
                      height={32} src="/mail-icon.svg" alt="mail icon" />muskan@techbeeps.co.in</a>
                </div>
                <div className="mt-[25px]">
                  <h3 className="text-sm font-bold leading-[22px] text-white">Order Summary</h3>
                  <div className="bg-[#011827] rounded-sm border-[#153C51] border mt-[15px]">
                    <div className="md:flex block gap-[12px]">
                      <div className="p-[10px] md:w-[465px] w-full max-w-full">
                        <div className="flex items-center gap-[10px] md:border-b md:pb-[13px] border-[#153C51]">
                          <div className="bg-white rounded-sm p-[8px]">

                            <Image
                              src="/productImage.png"
                              alt="productImage"
                              width={23}
                              height={32}
                              className="object-cover md:w-[71px] md:h-[99px] w-[36px] h-[50px]"
                            />
                          </div>
                          <div className="space-y-[3px]">
                            <p className="text-[13px] leading-sm font-semibold text-white">Sunroof</p>
                            <p className="text-[10px] leading-xs font-medium text-LightGray">Ordered Date: <span className="text-white">2024-04-24</span></p>
                            <p className="text-[10px] leading-xs font-medium text-LightGray">Delivery: <span className="text-white">5 Days</span></p>
                          </div>
                        </div>
                        <p className="text-[10px] md:mt-[10px] mt-[3px] md:text-right text-left md:ms-[0] ms-[50px] leading-xs font-medium text-LightGray">Price: <span className="text-white font-bold">₹12,000</span></p>
                      </div>
                      <div className="space-y-[10px] md:ps-[22px] md:p-[0] p-[10px] md:border-l border-t border-[#153C51]">
                        <p className="flex text-[13px] font-semibold leading-[16px] items-center gap-[8px] md:pt-[10px]"><Image width={23}
                          height={32} src="/map-icon.svg" alt="map icon" />Delivery Address</p>
                        <div className="space-y-[3px] ps-[24px]">
                          <p className="text-[10px] leading-xs font-medium text-white">Qasim</p>
                          <p className="text-[10px] leading-xs font-medium text-white">9876543120</p>
                          <p className="text-[10px] leading-xs font-medium text-white">Jaipur, Rajasthan - 30212</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:text-base text-sm border-b border-[#35373C] pb-[10px] font-bold mt-[15px] leading-sm flex justify-between items-center">
                    <p>Total</p>
                    <p>₹12,000</p>
                  </div>
                  <div className="flex justify-end mt-[30px]">
                    {/* <button
                      type="submit"
                      className="bg-autoblue text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                    >
                      Get Invoice
                    </button> */}
                  </div>
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
