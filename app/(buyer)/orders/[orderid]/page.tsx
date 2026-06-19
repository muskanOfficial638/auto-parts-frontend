"use client";
import { Suspense, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "../../../components/Header";
import { useEffect } from "react";
import { FaShippingFast } from "react-icons/fa";

import { fetchOrdersByID, imagePath } from "@/app/utils/api";
import Link from "next/link";
import OTPModal from "@/app/components/supplier/Modal/OtpModal";
import CancelOrder from "@/app/components/supplier/Modal/CancelOrder";

interface SupplierData {
  name: string;
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
interface ShippingDetails {
  tracking: string;
  tracking_url: string;
}
interface OrderDetailsType {
  id: string;
  orderID: string;
  quoteID: string;
  status: string; // extend if needed
  supplierData: SupplierData;
  address: ShippingAddress;
  created_at: string; // or Date if you convert it
  payment_meta: PaymentDetails;
  deliveryDate: string;
  productData: ProductData;
  shipping_details?: ShippingDetails;
}

const statusCode = {
  pending: { name: "Active", color: "text-white bg-autoblue" },
  in_process: { name: "In Process", color: "text-white bg-yellow-600" },
  in_transit: { name: "In Transit", color: "text-white bg-blue-500" },
  completed: { name: "Completed", color: "text-white bg-green-500" },
  cancelled: { name: "Cancelled", color: "text-white bg-red-500" },
  hold: { name: "Hold", color: "text-white bg-orange-500" },
} as const;

export default function RequestPartPage() {
  const [OrderDetails, setOrderDetails] = useState<OrderDetailsType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);
  const params = useParams();
  const orderid = params.orderid as string;
  const router = useRouter();

  // Load on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (!loggedInUser.id) router.replace("/logout");

      const data = await fetchOrdersByID(orderid);

      console.log("Fetched Order Details:", data);
      setLoading(false);
      if (data.status === false || data.error) {
        setOrderDetails(null);
      } else {
        setOrderDetails(data);
      }
    };
    loadInitialData();
  }, [orderid, router, otpModalOpen]);

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
          {loading && (
            <div className="flex justify-center items-center h-screen">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {OrderDetails && Object.keys(OrderDetails).length > 0 ? (
            <div className="flex flex-col justify-center items-center pt-36 pb-20 px-4">
              <div className="w-[830px] relative  max-w-[100%] rounded-sm ">
                <div className="flex justify-between items-center">
                  <h2 className="md:text-[26px] text-[20px] font-bold leading-[14px]">
                    Order Details{" "}
                  </h2>
                  <button
                    type="submit"
                    onClick={() => window.history.back()}
                    className="bg-autoblue text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                  >
                    Back To Order
                  </button>
                </div>
                <div className="bg-brandBlack md:py-[20px] md:px-[28px] p-[20px] rounded-sm mt-[20px]">
                  <div className="flex gap-2 justify-between items-center">
                    <div className="flex gap-2">
                      <p className="text-sm leading-[22px] font-bold text-white">
                        Order ID:
                        <span className=" ms-[5px] font-medium text-[#B9B9B9]">
                          {OrderDetails?.orderID}
                        </span>
                      </p>
                      <span
                        className={`px-[13px] py-[3px] rounded-[3px] text-xs leading-[14px] ${
                          statusCode[
                            OrderDetails?.status as keyof typeof statusCode
                          ]?.color || "text-gray-500"
                        }`}
                      >
                        {statusCode[
                          OrderDetails?.status as keyof typeof statusCode
                        ]?.name || "Unknown Status"}
                      </span>
                    </div>
                    {OrderDetails?.shipping_details?.tracking_url &&
                      OrderDetails?.status === "in_transit" && (
                        <button
                          onClick={() => setOtpModalOpen(true)}
                          className="text-autoblue md:w-[auto] w-full cursor-pointer md:text-base text-sm leading-[14px] border border-autoblue py-[13px] px-[20px] duration-400 hover:text-white rounded-sm hover:bg-hoverblue hover:border-hoverblue"
                        >
                          Mark as Completed
                        </button>
                      )}
                  </div>
                  <div className="flex items-center gap-[30px] bg-[#011827] p-[10px] rounded-sm mt-[25px] border-[#153C51] border">
                    <div className="flex-1">
                      <a
                        href="#"
                        className="flex text-[13px] font-semibold leading-[16px] items-center gap-[8px]"
                      >
                        <Image
                          width={23}
                          height={32}
                          src="/user-icon.svg"
                          alt="user icon"
                        />
                        @{OrderDetails?.supplierData?.name}
                      </a>
                      {OrderDetails?.shipping_details?.tracking && (
                        <p className="ps-[32px] text-xs text-[#B9B9B9] mt-[5px]">
                          <b className="text-white">Shipping Note:</b>{" "}
                          {OrderDetails?.shipping_details?.tracking}{" "}
                        </p>
                      )}
                    </div>
                    {OrderDetails?.shipping_details?.tracking_url &&
                      OrderDetails?.status === "in_transit" && (
                        <div className="ms-auto">
                          <Link
                            href={OrderDetails?.shipping_details?.tracking_url}
                            target="_blank"
                            className="bg-green-700 text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[9px] md:px-[12px] py-[9px] px-[15px] font-semibold hover:bg-green-900 duration-400 cursor-pointer"
                          >
                            <FaShippingFast className="inline-block mr-2" />{" "}
                            Track Now
                          </Link>
                        </div>
                      )}
                  </div>
                  <div className="flex items-center justify-between mt-[30px] bg-[#011827] p-[15px] rounded-sm border-[#153C51] border mt-[15px]">
                    <div>
                      { (OrderDetails?.payment_meta?.paymentStatus   || OrderDetails?.payment_meta?.transactionId) && <p>Payment Details</p> }
                     {OrderDetails?.payment_meta?.transactionId && (
                      <p className="text-xs text-[#B9B9B9] mt-[5px]">
                        <b className="text-white">Transaction ID:</b>{" "}
                        {OrderDetails?.payment_meta?.transactionId}{" "}
                      </p>
                     )}
                      {OrderDetails?.payment_meta?.paymentDate && (
                      <p className="text-xs text-[#B9B9B9] mt-[5px]">
                        <b className="text-white ">Payment Status:</b>{" "}
                        {OrderDetails?.payment_meta?.paymentStatus.toUpperCase()}{" "}
                      </p>)}
                    </div>
                    { ["completed"].includes(OrderDetails?.status) && (
                    <button
                      onClick={() => window.open(`/api/invoice/${OrderDetails.id}`, "_self")}
                      className="bg-autoblue text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                    > 
                      Get Invoice
                    </button>
                    )}
                    {["in_process"].includes(OrderDetails?.status) && (
                      <button
                      onClick={() => setCancelModalOpen(true)}
                      className="bg-red-600 text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-red-700 duration-400 cursor-pointer"
                    > 
                      Cancel Order
                    </button>
                    )}
                  </div>
                  <div className="mt-[25px]">
                    <h3 className="text-sm font-bold leading-[22px] text-white">
                      Order Summary
                    </h3>
                    <div className="bg-[#011827] rounded-sm border-[#153C51] border mt-[15px]">
                      <div className="md:flex block gap-[12px]">
                        <div className="p-[10px] md:w-[465px] w-full max-w-full">
                          <div className="flex items-center gap-[10px] md:border-b md:pb-[13px] border-[#153C51]">
                            <div className="bg-white rounded-sm px-[10px] py-[7px]">
                              {OrderDetails?.productData.image[0] && (
                                <Image
                                  src={
                                    imagePath +
                                    OrderDetails?.productData.image[0]
                                  }
                                  alt="productImage"
                                  width={150}
                                  height={150}
                                  className="object-cover md:w-[90px] md:h-[100px] w-[36px] h-[50px]"
                                />
                              )}
                            </div>
                            <div className="space-y-[3px]">
                              <p className="text-[13px] leading-sm font-semibold text-white">
                                {OrderDetails?.productData?.name}
                              </p>
                              <p className="text-[10px] leading-xs font-medium text-LightGray">
                                Ordered Date:{" "}
                                <span className="text-white">
                                  {OrderDetails?.created_at}
                                </span>
                              </p>
                              <p className="text-[10px] leading-xs font-medium text-LightGray">
                                Delivery:{" "}
                                <span className="text-white">
                                  {OrderDetails?.deliveryDate}
                                </span>
                              </p>
                            </div>
                          </div>
                          <p className="text-[10px] md:mt-[10px] mt-[3px] md:text-right text-left md:ms-[0] ms-[50px] leading-xs font-medium text-LightGray">
                            Price:{" "}
                            <span className="text-white font-bold">
                              R {OrderDetails?.payment_meta?.amount}
                            </span>
                          </p>
                        </div>
                        <div className="space-y-[10px] md:ps-[22px] md:p-[0] p-[10px] md:border-l border-t border-[#153C51]">
                          <p className="flex text-[13px] font-semibold leading-[16px] items-center gap-[8px] md:pt-[10px]">
                            <Image
                              width={23}
                              height={32}
                              src="/map-icon.svg"
                              alt="map icon"
                            />
                            Delivery Address
                          </p>
                          <div className="space-y-[3px] ps-[24px]">
                            <p className="text-[10px] leading-xs font-medium text-white">
                              {OrderDetails?.address?.name}
                            </p>
                            <p className="text-[10px] leading-xs font-medium text-white">
                              {OrderDetails?.address?.address},{" "}
                              {OrderDetails?.address?.city},
                              {OrderDetails?.address?.province}-{" "}
                              {OrderDetails?.address?.postal_code}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:text-base text-sm border-b border-[#35373C] pb-[10px] font-bold mt-[15px] leading-sm flex justify-between items-center">
                      <p>Total</p>
                      <p>R {OrderDetails?.payment_meta?.amount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex justify-center items-center pt-36 pb-20 px-4">
              <p className="text-white pt-[150px]">Order Not Found</p>
            </div>
          )}
        </div>
        {OrderDetails && (
          <OTPModal
            quoteId={OrderDetails.quoteID}
            open={otpModalOpen}
            onClose={() => setOtpModalOpen(false)}
          />
        )}

          <CancelOrder
            quoteId={orderid}
            open={cancelModalOpen}
            onClose={() => setCancelModalOpen(false)}
          />
   
        
      </Suspense>
      <Footer />
    </main>
  );
}
