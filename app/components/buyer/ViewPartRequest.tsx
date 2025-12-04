/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import {
  fetchPartRequestsById,
  getQuoteByRequest,
  updateQuoteByAction,
} from "@/app/utils/api";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
interface PartRequest {
  title: string;
  urgency: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_model_trim: string;
  required_by_date: string;
  attachment: string;
  status: number;
  description: string;
}

interface Quote {
  id: string;
  request_id: string;
  user_id: string;
  price_cents: string;
  currency: string;
  eta_days: string;
  terms: string;
  status: string;
  created_at: string;
  user?: object | any;
}

export default function ViewPartRequest() {
  const searchParams = useSearchParams();
  const request = searchParams.get("request") || "";
  const [partRequest, setPartRequest] = useState<PartRequest>();
  const [quoteData, setQuoteData] = useState<Quote[]>();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    if (loggedInUser?.access_token && request) {
      fetchPartRequestsById(request, loggedInUser.access_token).then((data) => {
        setPartRequest(data);
        setIsLoading(false);
      });

      getQuoteByRequest(request, loggedInUser.access_token).then((data) => {
        setQuoteData(data);
      });
    }
  }, [request]);

  useEffect(() => {
    console.log("quoteData:", quoteData);
  }, [partRequest, quoteData]);

  async function handleActionChange(
    quoteId: string,
    requestId: string,
    tab: string
  ) {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    try {
      const response = await updateQuoteByAction(
        quoteId,
        requestId,
        tab,
        loggedInUser?.access_token
      );
      // console.log("update:", response);

      if (response?.status === 200) {
        toast("Action updated successfully");
        setTimeout(() => {
          // Call the callback function from the parent
          window.location.reload();
        }, 2000);
      }
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />
      <ToastContainer />

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
                  {partRequest?.title}
                  <span className="px-2 py-1 bg-green-600/80 text-white text-xs rounded">
                    {partRequest?.urgency}
                  </span>
                </h1>

                <p className="text-gray-200 text-sm">
                  {partRequest?.description}
                </p>

                <p className="text-gray-400 text-sm mt-2">
                  {partRequest?.vehicle_make} {partRequest?.vehicle_model} •{" "}
                  {partRequest?.vehicle_model_trim}
                </p>
                <p className="text-gray-200 text-sm">
                  Required By:{" "}
                  <span className="text-white font-medium">
                    {partRequest?.required_by_date}
                  </span>
                </p>
              </div>
            </div>

            <button className="text-autoblue rounded-md hover:border-hoverblue">
              <span className="border border-autoblue p-4">
                Mark as Completed
              </span>
            </button>
          </div>

          {/* QUOTES LIST */}
          <div className="space-y-5 mt-4">
            {/* === Quote Box Component === */}
            {/* {[1, 2, 3].map((quote, index) => (
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

                   Right-Side Buttons 
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
            ))} */}
            {quoteData &&
              quoteData.map((data: Quote) => (
                <div
                  key={data.id}
                  className="bg-[#011827] border border-[#153C51] rounded-md p-5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-semibold">
                        @{data?.user?.user_name}
                      </p>
                      <p className="text-gray-200 text-sm">
                        {data?.user?.email}
                      </p>

                      <p className="text-gray-300 mt-3 text-sm">
                        <span className="font-semibold text-gray-400">
                          Price:
                        </span>{" "}
                        <span className="text-autoblue">
                          {data?.price_cents}
                        </span>
                      </p>

                      <p className="text-gray-300 text-sm">
                        <span className="font-semibold text-gray-400">
                          Delivery Days:
                        </span>{" "}
                        {data?.eta_days}
                      </p>

                      <p className="text-gray-300 text-sm mt-2">
                        <span className="font-semibold text-gray-400">
                          Description:
                        </span>{" "}
                        {data?.terms}
                      </p>
                    </div>

                    {/* Right-Side Buttons  */}
                    <div className="flex items-center gap-3">
                      {data?.status == "accepted" && (
                        <div className="bg-autoblue px-5 py-2 text-white rounded-md">
                          Accepted
                        </div>
                      )} {data?.status == "pending" && (
                        <>
                          <button
                            className="bg-green-600 px-5 py-2 text-white rounded-md hover:bg-green-700 cursor-pointer"
                            onClick={() =>
                              handleActionChange(
                                data?.id,
                                data?.request_id,
                                "accepted"
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-600 px-5 py-2 text-white rounded-md hover:bg-red-700 cursor-pointer"
                            onClick={() =>
                              handleActionChange(
                                data?.id,
                                data?.request_id,
                                "rejected"
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
    </div>
  );
}
