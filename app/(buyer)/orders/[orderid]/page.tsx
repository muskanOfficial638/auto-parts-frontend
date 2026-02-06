"use client";
import { Suspense, useState } from "react";
import Image from "next/image";
import { useParams } from 'next/navigation';
import Footer from "@/app/components/Footer";
import Header from "../../../components/Header";
import { useEffect } from "react";

import { fetchOrdersByID, imagePath } from "@/app/utils/api";

interface SupplierData {
  name: string;
  email: string;
}

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
}

interface ProductData {
  name: string;
  image: string[];
}
export interface PaymentDetails {
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;   
  amount: number;
  transactionId: string;
  gateway: string;
  notes?: string;
}
interface OrderDetailsType {
  id: string;
  orderID: string;
  status: string; // extend if needed
  supplierData: SupplierData;
  address: ShippingAddress;
  created_at: string; // or Date if you convert it
  payment_meta: PaymentDetails;
  deliveryDate: string;
  productData: ProductData;
}

export default function RequestPartPage() {
  const [OrderDetails, setOrderDetails] = useState<OrderDetailsType | null>(null);
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
      console.log("Fetched Order Details:", data.payment_meta.amount);
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
                  onClick={() => window.history.back()}
                  className="bg-autoblue text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  Back To Order
                </button>
              </div>
              <div className="bg-brandBlack md:py-[20px] md:px-[28px] p-[20px] rounded-sm mt-[20px]">
                <div className="flex gap-2">
                  <p className="text-sm leading-[22px] font-bold text-white">Order ID:
                    <span className=" ms-[5px] font-medium text-[#B9B9B9]">{OrderDetails?.orderID}</span>
                  </p>
                  <span className="bg-[#6BB776] px-[13px] py-[3px] rounded-[3px] text-xs leading-[14px]">{OrderDetails?.status}</span>
                </div>
                <div className="bg-[#011827] p-[10px] rounded-sm mt-[25px] border-[#153C51] border">
                  <a href="#" className="flex text-[13px] font-semibold leading-[16px] items-center gap-[8px]">
                    <Image width={23}
                      height={32} src="/user-icon.svg" alt="user icon" />@{OrderDetails?.supplierData?.name}</a>
                
                </div>
                <div className="mt-[25px]">
                  <h3 className="text-sm font-bold leading-[22px] text-white">Order Summary</h3>
                  <div className="bg-[#011827] rounded-sm border-[#153C51] border mt-[15px]">
                    <div className="md:flex block gap-[12px]">
                      <div className="p-[10px] md:w-[465px] w-full max-w-full">
                        <div className="flex items-center gap-[10px] md:border-b md:pb-[13px] border-[#153C51]">
                          <div className="bg-white rounded-sm px-[10px] py-[7px]">
                          { OrderDetails?.productData.image[0] && (
                            <Image
                              src={imagePath+OrderDetails?.productData.image[0]}
                              alt="productImage"
                              width={150}
                              height={150}
                              className="object-cover md:w-[90px] md:h-[100px] w-[36px] h-[50px]"
                            />)}
                          </div>
                          <div className="space-y-[3px]">
                            <p className="text-[13px] leading-sm font-semibold text-white">{OrderDetails?.productData?.name}</p>
                            <p className="text-[10px] leading-xs font-medium text-LightGray">Ordered Date: <span className="text-white">{OrderDetails?.created_at}</span></p>
                            <p className="text-[10px] leading-xs font-medium text-LightGray">Delivery: <span className="text-white">{OrderDetails?.deliveryDate
}</span></p>
                          </div>
                        </div>
                        <p className="text-[10px] md:mt-[10px] mt-[3px] md:text-right text-left md:ms-[0] ms-[50px] leading-xs font-medium text-LightGray">Price: <span className="text-white font-bold">R {OrderDetails?.payment_meta?.amount}</span></p>
                      </div>
                      <div className="space-y-[10px] md:ps-[22px] md:p-[0] p-[10px] md:border-l border-t border-[#153C51]">
                        <p className="flex text-[13px] font-semibold leading-[16px] items-center gap-[8px] md:pt-[10px]"><Image width={23}
                          height={32} src="/map-icon.svg" alt="map icon" />Delivery Address</p>
                        <div className="space-y-[3px] ps-[24px]">
                          <p className="text-[10px] leading-xs font-medium text-white">{OrderDetails?.address?.name}</p>
                          <p className="text-[10px] leading-xs font-medium text-white">{OrderDetails?.address?.address}, {OrderDetails?.address?.city},{OrderDetails?.address?.province}- {OrderDetails?.address?.postal_code}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:text-base text-sm border-b border-[#35373C] pb-[10px] font-bold mt-[15px] leading-sm flex justify-between items-center">
                    <p>Total</p>
                    <p>R {OrderDetails?.payment_meta?.amount}</p>
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
