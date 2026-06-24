/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import GalleryLoader from "../common/GalleryLoader";
import { IoIosImages } from "react-icons/io";
import {
  fetchPartRequestsById,
  getQuoteByRequest,
  imagePath,
  QuoteReject,

} from "@/app/utils/api";
import { useRouter, useSearchParams } from "next/navigation";

import { PartRequestview, Quoteview ,AddresswithoutID} from "../common/interface";
import OrderCreate from "./OrderCreate";
import OTPModal from "../supplier/Modal/OtpModal";
import { toast } from "react-toastify";

type SelectedData = {
  quoteId: string;
  userName: string;
  etaDays: string;
  priceCents: string;
  productName: string;
  address: AddresswithoutID;
};
const statusCode ={
  0: { name: "Active", color: "text-white-500" },
  1: { name: "In Process", color: "text-yellow-500" },
  2: { name: "In Transit", color: "text-blue-500" },
  3: { name: "Completed", color: "text-green-500" },
  4: { name: "Cancelled", color: "text-red-500" }
}

export default function ViewPartRequest() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const request = searchParams.get("request") || "";
  const [partRequest, setPartRequest] = useState<PartRequestview>();
  const [quoteData, setQuoteData] = useState<Quoteview[]>();
  const [loading, setIsLoading] = useState(true);
  const [isOpenCreateOrder, setIsOpenCreateOrder] = useState(false);
  const [hasAccepted, setHasAccepted] = useState<boolean>(false);
  const [inProcess, setinProcess] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<SelectedData | null>(null);
  const [selectGallery, setSelectedGallery] = useState<string[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);
  const [dataChanged, setdataChanged] = useState<number>(0);
  const [acceptedId, setAcceptedId] = useState<string >("");


  if (!request) {

    router.replace('/buyer-dashboard');
  }

  useEffect(() => {
    if(otpModalOpen) return;
    if ( request) {
      try {
      fetchPartRequestsById(request).then((data) => {
        setPartRequest(data);
        setIsLoading(false);
        if(data.attachment && data.attachment.length > 0){ 
      setIsLoading(false);
        }
      
      });

      getQuoteByRequest(request).then((data) => {
        data?.some((item : Quoteview) => item.status === "in_transit" && setAcceptedId(item.id));
        setQuoteData(data);
        setHasAccepted(data?.some((item : Quoteview) => item.status === "in_transit"));
        setinProcess(data?.some((item : Quoteview) => item.status === "in_process"));

      });
    } catch (error) {
      console.error("Error fetching part request or quotes:", error);
      toast.error("Failed to fetch data. Please try again later.");
     
    }
    }
  }, [request,otpModalOpen,dataChanged]);

  useEffect(() => {
    // console.log("quoteData:", quoteData);
  }, [partRequest, quoteData]);


  function openGallery(data: string[]) {
    setSelectedGallery(data);
    setGalleryOpen(true);
  }

 async function handleActionReject(QuoteId:string) {
         const response = await QuoteReject(
       {
         quote_id: QuoteId,
         request_id: request,
         status: "rejected",
       }
     );
  
     if (response.data.success === true) {
       toast.success("Quote rejected successfully");
       setdataChanged(1)
     } else {
       toast.error(response.data.message || "Quote action failed");
     }

  
 }



    
   
 

  async function handleActionChange(
    quoteId: string,
    supplierName: string,
    etaDays: string,
    priceCents: string,
    
  ) {
    if (!partRequest?.address) return;
    setSelectedData({ quoteId: quoteId, userName: supplierName, etaDays, priceCents, productName: partRequest?.title ?? '', address: partRequest?.address});
    try {

      setIsOpenCreateOrder(true);

    } catch (err: any) {
      // Handle errors more gracefully
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Server error:", err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response:", err.request);
      } else {
        // Something else happened
        console.error("Error:", err.message);
      }
    }
  }



  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" />
     

      {/* Page Content */}
      <div className="relative z-10 flex justify-center pt-36 pb-20 px-4">
        <div className="w-full max-w-[1037px] bg-brandBlack rounded-sm shadow-lg p-[20px]">
          {/* Header (Image + Title + Button) */}
          <div className="flex justify-between gap-y-[20px] items-center">
            <div className="flex items-start gap-[15px]">
              <div className="relative bg-white  py-[7px] px-[7px] rounded-sm flex items-center justify-center overflow-hidden">
               {partRequest?.attachment && partRequest?.attachment[0] && (
                  <Image
                    src={imagePath + partRequest?.attachment[0]}
                    alt="Filter"
                    width={150}
                    height={150}
                    className="object-cover md:w-[140px] md:h-[140px] w-[36px] h-[50px]"
                  />
                )}
                <IoIosImages onClick={() => openGallery(partRequest?.attachment || [])} className="absolute bottom-1 right-1 shadow-[0_1px_5px_#817f7f] cursor-pointer hover:bg-[#000] duration-600 bg-[#040404c7] text-white text-[33px] p-[4px] rounded-[5px]" /  >
              </div>

              <div className="flex flex-col justify-start">
                <h1 className="md:text-[26px] text-lg text-white font-bold leading-[22px] flex gap-2 items-center">
                  {partRequest?.title}
                  <span className="text-[8px] font-medium capitalize leading-[10px] text-white bg-[#52A84E] px-[9px] py-[1px] rounded-[50px]">
                    {partRequest?.urgency}
                  </span>
                </h1>
                <p className="md:text-xs text-[10px] leading-[15px] font-medium text-neutralLight md:mt-[10px] mt-[5px]">
                  {partRequest?.vehicle_make} {partRequest?.vehicle_model} •{" "}
                  {partRequest?.vehicle_model_trim}
                </p>
                <p className="text-[10px] leading-[22px] font-medium text-[#F8F8F8] mt-[5px]">
                  Required By:{" "}
                  <span className="font-bold">
                    {partRequest?.required_by_date}
                  </span>
                </p>
                {partRequest?.address  &&(
                  <p className="text-[10px] leading-[22px] font-medium text-[#F8F8F8] mt-[5px]">
                  Delivery address:{" "}
                  <span className="font-bold">
                    {partRequest?.address?.address}, {partRequest?.address?.city}, {partRequest?.address?.province} {partRequest?.address?.postal_code}
                  </span>
                </p>
               
                )}
                
                <p className="text-[10px] leading-[22px] font-medium text-[#F8F8F8] mt-[5px]">
                  Status:{" "}
  
               <span className={`font-medium capitalize leading-[10px] ${statusCode[partRequest?.status as keyof typeof statusCode]?.color || "text-gray-500"} px-[9px] py-[1px] rounded-[50px]`}>{statusCode[partRequest?.status as keyof typeof statusCode]?.name || "Unknown"}</span>
                </p>
 
              </div>
            </div>
            <div className="flex flex-col items-end gap-[30px] self-start">
              <button onClick={() => history.back()} className="bg-white cursor-pointer h-8 w-8 rounded-full flex justify-center items-center text-black "><FaArrowLeft /></button>
              
              {partRequest?.status == 2 && hasAccepted && (
              <button onClick={()=>setOtpModalOpen(true)} className="whitespace-nowrap text-autoblue md:w-[auto] w-full cursor-pointer md:text-base text-sm leading-[14px] border border-autoblue py-[13px] px-[20px] duration-400 hover:text-white rounded-sm hover:bg-hoverblue hover:border-hoverblue">
                Mark as Completed
              </button>
     )}
            </div>
          </div>
          <div>
             <p className="pt-3 md:text-sm text-xs leading-[22px] font-medium text-white mt-[5px]">
                  {partRequest?.description}
                </p>
          </div>

          {/* QUOTES LIST */}
          <div className="space-y-[10px] mt-[16px]">
            {quoteData?.length &&
              quoteData?.map((data: Quoteview) =>
                 (
              
                <div
                  key={data.id}
                  className="bg-[#011827] border border-[#153C51] rounded-sm pt-[5px] pb-[15px] ps-[12px] pe-[22px]"
                >
                  <div className="flex justify-between gap-y-[20px] items-center">
                    <div>
                      <p className="text-white md:text-sm text-xs font-bold leading-[22px]">
                        @{data?.user?.user_name}
                      </p>
                      {/* <p className="leading-[22px] md:text-xs text-[10px]">
                        {data?.user?.email}
                      </p> */}

                      <p className="text-neutralLight mt-[5px] text-xs  leading-[15px]">
                        <span className="font-semibold text-neutralLight">
                          Price:
                        </span>{" "}
                        <span className="text-[10px] medium leading-[22px] text-autoblue">
                          R {data?.price_cents}
                        </span>
                      </p>

                      <p className="text-neutralLight medium mt-[5px] text-xs leading-[15px]">
                        <span className="font-bold text-neutralLight">
                          Delivery Days:
                        </span>{" "}
                        {data?.eta_days}
                      </p>

                      <p className="text-neutralLight medium mt-[5px] text-xs leading-[15px]">
                        <span className="font-bold text-neutralLight">
                          Description:
                        </span>{" "}
                        {data?.terms}
                      </p>
                    </div>

                    {/* Right-Side Buttons  */}
                    <div className="flex items-center gap-3">
                      {data?.status == "in_process" && (
                        <div className="bg-autoblue hover:bg-hoverblue duration-400 cursor-pointer md:text-base text-xs leading-[14px] md:px-[38px] md:py-[13px] px-[28px] py-[8px] text-white rounded-sm">
                          Accepted
                        </div>
                      )}
                      
                      {data?.status == "rejected" && (
                        <button disabled className="bg-red-600 duration-400 md:text-base text-xs leading-[14px] md:px-[38px] md:py-[13px] px-[28px] py-[8px] text-white rounded-sm">
                          Rejected
                        </button>
                      )}

                           <button title="view images"
                            className="bg-gray-600  md:text-base text-xs duration-400 leading-[14px] md:px-[12px] md:py-[6px] px-[0px] py-[8px] text-white rounded-sm hover:bg-gray-700 cursor-pointer"
                            onClick={() =>
                              openGallery(data?.attachment || [])
                         
                            }
                          >
                            <IoIosImages className="text-[30px]" />
                          </button>
                      {data?.status == "pending" && !inProcess && (
                        <>
                          <button 
                            className="bg-green-600 md:text-base text-xs duration-400 leading-[14px] md:px-[38px] md:py-[13px] px-[28px] py-[8px] text-white rounded-sm hover:bg-green-700 cursor-pointer"
                            onClick={() =>
                              handleActionChange(
                                data?.id,

                                data?.user?.user_name,
                                data?.eta_days,
                                data?.price_cents,
                               

                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-600 px-5 py-2 md:text-base text-xs duration-400 leading-[14px] md:px-[38px] md:py-[13px] px-[28px] py-[8px] text-white rounded-sm hover:bg-red-700 cursor-pointer"
                          onClick={() =>
                            handleActionReject(
                              data?.id
                              
                            )
                          }
                          >
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
        <OTPModal quoteId={acceptedId} open={otpModalOpen} onClose={() => setOtpModalOpen(false)} />
      {isOpenCreateOrder && <OrderCreate closeModal={setIsOpenCreateOrder} dataSelect={selectedData} />}
      <GalleryLoader onClose={setGalleryOpen} open={galleryOpen} images={selectGallery}  />
       
    </div>
    
  );
}
