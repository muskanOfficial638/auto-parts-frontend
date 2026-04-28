"use client";

import BidModal from "@/app/components/supplier/Modal/BidModal";

import { getQuoteBySupplier, imagePath } from "@/app/utils/api";
import { useMemo, useState } from "react";
import { Quote } from "../common/interface";
import Loader from "../common/Loader";
import { MdDelete } from "react-icons/md";
import DeleteQuoteModal from "../buyer/modal/DeleteQuoteModal";
import Image from "next/image";
import TrackingModal from "./Modal/TrackingModal";
import { useRouter } from "next/navigation";
import SupplierDashboard from "../dashboard/SupplierDashboard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function MyBids() {
  const [activeTab, setActiveTab] = useState("Active");
  const [quoteData, setQuoteData] = useState<Quote[]>();
  const [loading, setIsLoading] = useState(false);
  const [delmodalOpen, setdelModalOpen] = useState(false);
  const [deleteQuoteId, setDeleteQuoteId] = useState("");
  const [shipQuoteId, setShipQuoteId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isTrackingModal, setIsTrackingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const statusCode = {
    pending: { name: "Active", color: "bg-gray-500" },
    in_process: { name: "In Process", color: "bg-yellow-500" },
    in_transit: { name: "In Transit", color: "bg-blue-500" },
    completed: { name: "Completed", color: "bg-green-500" },
    cancelled: { name: "Cancelled", color: "bg-red-500" },
    rejected: { name: "Rejected", color: "bg-red-500" }
  };
  // const [loading, setIsLoading] = useState(true);
  const router = useRouter();

  function onTabClick(tabName: string) {
    setActiveTab(tabName);
    setIsLoading(true);
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (!loggedInUser.id) router.replace("/logout");
    if (tabName == "Active") {
      setIsLoading(false);
      return;
    }
    if (loggedInUser) {
      getQuoteBySupplier(loggedInUser?.id, tabName, 1, 10)
        .then((data) => {
          setQuoteData(data?.quotes);
          setIsLoading(false);
        })
        .catch(() => {
          setQuoteData([]);
          setIsLoading(false);
        });
    }
  }

  function ModalOpendelete(requestId: string | undefined) {
    if (!requestId) return;
    setDeleteQuoteId(requestId);
    setdelModalOpen(true);
  }

  const filteredData = useMemo(() => {
    let result = quoteData;
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      if (result) {
        result = result.filter(
          (item) => {
            if (item.part_request) {
              return item.part_request.title.toLowerCase().includes(lowerSearch) ||
                item.part_request.vehicle_make.toLowerCase().includes(lowerSearch) ||
                item.part_request.vehicle_model.toLowerCase().includes(lowerSearch) ||
                item.part_request.vehicle_model_trim.toLowerCase().includes(lowerSearch) ||
                item.part_request.urgency.toLowerCase().includes(lowerSearch) ||
                item.part_request.required_by_date.toLowerCase().includes(lowerSearch);
            }
          }
        );
      }
    }



    return result;
  }, [quoteData, searchTerm]);


  return (
    <>
      <div className="min-h-screen w-full relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute top-[0] bottom-[0] h-full w-full bg-gradient-to-b from-[#003253]/95 to-black/95" />

        {/* Main Content */}
        <div className="relative  flex justify-center pt-36 pb-20 px-4">
          {/* List Items */}
          <div className="space-y-[25px] w-full max-w-[1037px] rounded-lg shadow-lg ">
            <h2 className="text-2xl leading-[14px] font-bold text-center text-white">
              My Quote
            </h2>
            <div className="md:text-xl text-sm overflow-x-auto font-medium items-center flex md:space-x-[36px] space-x-[20px] md:my-10 my-5 flex md:justify-center justify-items-start">
              <span
                className={`cursor-pointer ${activeTab === "Active"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                  }`}
                onClick={() => onTabClick("Active")}
              >
                Active
              </span>

              <span
                className={`cursor-pointer whitespace-nowrap ${activeTab === "pending"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                  }`}
                onClick={() => onTabClick("pending")}
              >
                Pending
              </span>

              <span
                className={`cursor-pointer whitespace-nowrap ${activeTab === "in_process"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                  }`}
                onClick={() => onTabClick("in_process")}
              >
                In Process
              </span>
              <span
                className={`cursor-pointer whitespace-nowrap ${activeTab === "in_transit"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                  }`}
                onClick={() => onTabClick("in_transit")}
              >
                In Transit
              </span>

              <span
                className={`cursor-pointer whitespace-nowrap ${activeTab === "completed"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                  }`}
                onClick={() => onTabClick("completed")}
              >
                Completed
              </span>
                            <span
                className={`cursor-pointer whitespace-nowrap ${activeTab === "rejected"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                  }`}
                onClick={() => onTabClick("rejected")}
              >
                Rejected
              </span>
              <span
                className={`cursor-pointer whitespace-nowrap ${activeTab === "cancelled"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                  }`}
                onClick={() => onTabClick("cancelled")}
              >
                Cancelled
              </span>
            </div>

            {/* Search Bar */}
            {activeTab !== "Active" && ( 
            <div className="flex justify-center">
              <div className="relative w-full max-w-[583px]">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white text-sm text-grayMedium placeholder-grayMedium leading-[17px] rounded-sm py-[10px] px-[15px] border border-[#1f2d3a] focus:outline-none"
                />
                <div className="bg-autoblue text-white absolute right-0 flex  rounded-r-sm items-center h-full top-0 py-[10px] px-[13px]">
                  <MagnifyingGlassIcon className="h-[14px] w-[14px]" />
                </div>
              </div>
            </div>
            )}

            {loading ? (
              <Loader />
            ) : (
              <>
                {activeTab == "Active" ? (
                  <SupplierDashboard />
                ) : filteredData && filteredData?.length ? (
                  filteredData.map((data: Quote) => (
                    <div
                      key={data.id}
                      className="bg-brandBlack p-[20px] rounded-lg flex flex-wrap lg:gap-[0] gap-y-[20px] items-center justify-between"
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="bg-white py-[5px] px-[5px] md:mt-[0] mt-[4px] rounded-sm">
                          <Image
                            width={100}
                            height={100}
                            src={imagePath + data?.part_request?.attachment[0]}
                            alt="Filter"
                            className="md:w-[60px] md:h-[70px] w-[45px] h-[50px] object-cover"
                          />
                        </div>

                        <div className="md:w-[350px]">
                          <h3 className="text-base leading-[22px] text-white font-bold flex items-center gap-[8px]">
                            {data?.part_request?.title}{" "}
                            <span
                              className={`text-[8px] font-medium leading-[10px] text-white px-[9px] py-[1px] rounded-[50px] ${data?.part_request?.urgency === "high" ? "bg-red-500" : data?.part_request?.urgency === "normal" ? "bg-yellow-500" : "bg-[#52A84E]"}`}
                            >
                              {data?.part_request?.urgency}
                            </span>
                          </h3>

                          <p className="text-xs leading-[15px] font-medium text-neutralLight mt-[5px]">
                            {data?.part_request?.vehicle_make}{" "}
                            {data?.part_request?.vehicle_model}{" "}
                            {data?.part_request?.vehicle_model_trim}
                          </p>

                          <p className="text-[10px] font-medium text-[#F8F8F8] mt-[5px]">
                            Required By:{" "}
                            <span>{data?.part_request?.required_by_date}</span>
                          </p>
                          {data?.part_request?.address && (
                            <p className="text-[10px] font-medium text-[#F8F8F8] mt-[5px]">
                              Address:{" "}
                              <span>
                                {data?.part_request?.address?.name}{" "}
                                {data?.part_request?.address?.address}{" "}
                                {data?.part_request?.address?.city}{" "}
                                {data?.part_request?.address?.province} (
                                {data?.part_request?.address?.postal_code})
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="bg-[#011827] md:w-auto w-full p-[10px] border border-[#153C51] rounded-sm text-white flex flex-col w-50">
                          <span className="font-bold text-xs leading-[22px]">
                            Price:{" "}
                            <small className="font-medium ms-[6px] text-xs leading-[22px]">
                              {data?.price_cents}
                            </small>
                          </span>
                          <span className="font-bold text-xs leading-[22px]">
                            Date:{" "}
                            <small className="font-medium ms-[6px] text-xs leading-[22px]">
                              {data?.created_at}
                            </small>
                          </span>
                          { (data?.status !== "pending"  && data?.order_id)&& (
                          <span className="font-bold text-xs leading-[22px]">
                            Order ID:{" "}
                            <small className="font-medium ms-[6px] text-xs leading-[22px]">
                              {data?.order_id}
                            </small>
                          </span>
                          )}
                          
                        </div>
                      </div>
                      <div className="flex md:items-center md:gap-[10px] gap-[8px]">
                        {activeTab === "in_process" ? (
                          <>
                            <button
                              className="cursor-pointer bg-autoblue hover:bg-hoverblue text-white md:text-base text-sm font-semibold leading-[14px]  md:w-[auto] w-full duration-400 px-[44px] md:py-[13px] py-[10px] rounded-sm"
                              onClick={() => {
                                setShipQuoteId(data?.id);
                                setIsTrackingModalOpen(true);
                              }}
                            >
                              Process now
                            </button>
                          </>
                        ) : (
                          <button
                            className={`${statusCode[data?.status as keyof typeof statusCode]?.color || ""} text-white md:text-base text-sm font-semibold leading-[14px]  md:w-[auto] w-full duration-400 px-[44px] md:py-[13px] py-[10px] rounded-sm`}
                            disabled
                          >
                            {statusCode[data?.status as keyof typeof statusCode]
                              ?.name || data?.status}
                          </button>
                        )}

                        {activeTab === "pending" && (
                          <button
                            className={`cursor-pointer hover:text-red-300 text-red-500 bg-white text-[25px] px-[10px] py-[8px] rounded-[5px]`}
                            onClick={() => ModalOpendelete(data?.id)}
                          >
                            <MdDelete />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="font-bold text-center text-white">
                    No quotes found
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <DeleteQuoteModal
        open={delmodalOpen}
        requestId={deleteQuoteId}
        onClose={() => setdelModalOpen(false)}
        onDeleted={onTabClick} // <-- notify parent
      />

      <TrackingModal
        open={isTrackingModal}
        onClose={() => {
          setIsTrackingModalOpen(false);
          onTabClick("in_process");
        }}
        quoteId={shipQuoteId}
      />

      <BidModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
