/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";


import BidModal from "@/app/components/supplier/Modal/BidModal";
import { fetchAllSupplierPartRequests, imagePath } from "@/app/utils/api";
import { FaEye } from "react-icons/fa";
import { PartRequest } from "../common/interface";
import Loader from "../common/Loader";
import { IoIosImages } from "react-icons/io";
import { ImSpinner6 } from "react-icons/im";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import GalleryLoader from "../common/GalleryLoader";
import { useRouter } from "next/navigation";

export default function SupplierDashboard() {

  /* ---------------- STATES ---------------- */

  const [modalOpen, setModalOpen] = useState(false);

  const [partRequestData, setPartRequestData] = useState<PartRequest[]>();
  const [filterpartRequestData, setFilterPartRequestData] = useState<PartRequest[]>();

  const [userRequest, setUserRequest] = useState<PartRequest>();

  const [metaPage, setMetaPage] = useState({ page: 1, total_pages: 1 });
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setIsLoading] = useState(true);
  const [loadingPage, setIsLoadingPage] = useState(true);

  /* ----------- TAG SEARCH STATES ----------- */

  const [searchInput, setSearchInput] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);

  /* ---------------------------------------- */

  const [onDetailsClose, setOnDetailsClose] = useState(false);
  const [partRequest, setPartRequest] = useState<PartRequest>();

  const [selectGallery, setSelectedGallery] = useState<string[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const [pageLoad, setpageLoad] = useState(false);

  const router = useRouter();


  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {

    if (typeof window !== "undefined") {

      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");

      if (!loggedInUser.id) router.replace("/logout");

      fetchAllSupplierPartRequests(currentPage).then((data) => {

        setPartRequestData(data.data);

        setIsLoading(false);
        setIsLoadingPage(false);

        setMetaPage({
          page: data.page,
          total_pages: data.total_pages,
        });

        setTimeout(() => {
          setpageLoad(true);
        }, 500);

      });
    }

  }, [currentPage, router]);


  /* ---------------- FILTER LOGIC (AND) ---------------- */

 useEffect(() => {
  const delay = setTimeout(() => {

    if (!partRequestData) return;

    let filtered = partRequestData;

    // Combine tags + current typing
    const activeFilters = [
      ...searchTags,
      searchInput.trim().toLowerCase()
    ].filter(Boolean); // remove empty values


    if (activeFilters.length > 0) {

      filtered = filtered.filter((item: any) => {

        const searchableText = `
          ${item.title}
          ${item.description}
          ${item.urgency}
          ${item.vehicle_make}
          ${item.vehicle_model}
        `.toLowerCase();

        // AND condition
        return activeFilters.every((word) =>
          searchableText.includes(word)
        );
      });
    }

    setFilterPartRequestData(filtered);

  }, 300);

  return () => clearTimeout(delay);

}, [searchTags, searchInput, partRequestData]);

  /* ---------------- TAG HANDLERS ---------------- */

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === "Enter") {

      e.preventDefault();

      const value = searchInput.trim().toLowerCase();

      if (!value) return;

      if (searchTags.length >= 3) {
        alert("Only 3 search tags allowed");
        return;
      }

      if (searchTags.includes(value)) return;

      setSearchTags((prev) => [...prev, value]);

      setSearchInput("");
    }
  };


  const removeTag = (tag: string) => {
    setSearchTags((prev) => prev.filter((t) => t !== tag));
  };


  const clearAllTags = () => {
    setSearchTags([]);
  };


  /* ---------------- OTHER HANDLERS ---------------- */

  function ModalOpen(requestData: PartRequest) {
    setUserRequest(requestData);
    setModalOpen(true);
  }


  function openGallery(data: string[]) {
    setSelectedGallery(data);
    setGalleryOpen(true);
  }


  /* ---------------- LOADER ---------------- */

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }


  /* ================== JSX ================== */

  return (
    <>

      <div>

        <div className="relative flex-1 text-white overflow-auto">

          {/* ================= SEARCH + TAGS ================= */}

          <div className="flex flex-col items-center mb-6 gap-2">


            {/* TAGS */}
            {searchTags.length > 0 && (

              <div className="flex flex-wrap gap-2 max-w-[583px] w-full">

                {searchTags.map((tag) => (

                  <span
                    key={tag}
                    className="flex items-center  bg-[#12151b] shadow text-white text-md px-3 py-1 rounded-full"
                  >
                    {tag}

                    <button
                      onClick={() => removeTag(tag)}
                      className="cursor-pointer hover:text-red-400 text-xl"
                    >
                    <IoCloseOutline className="text-[20px]"/>
                    </button>

                  </span>

                ))}


                <button
                  onClick={clearAllTags}
                  className="text-xs hover:text-red-500 underline cursor-pointer"
                >
                  Clear All
                </button>

              </div>

            )}


            {/* INPUT */}
            <div className="relative w-full max-w-[583px]">

              <input
                type="text"
                placeholder="Type & press Enter..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full bg-white text-sm text-grayMedium placeholder-grayMedium leading-[17px] rounded-sm py-[10px] px-[15px] border border-[#1f2d3a] focus:outline-none"
              />

              <div className="bg-autoblue text-white absolute right-0 flex rounded-r-sm items-center h-full top-0 px-[13px]">
                <MagnifyingGlassIcon className="h-[14px] w-[14px]" />
              </div>

            </div>

          </div>


          {/* ================= LIST ================= */}

          <div className="space-y-[10px]">

            {filterpartRequestData && filterpartRequestData.length > 0 ? (

              filterpartRequestData.map((item) => (

                <div
                  key={item.id}
                  className="bg-brandBlack p-[20px] rounded-lg flex flex-wrap gap-y-[20px] items-center justify-between"
                >

                  {/* LEFT */}
                  <div className="flex gap-4">

                    <div className="bg-white p-1 rounded-sm">

                      <Image
                        onClick={() => {
                          setPartRequest(item);
                          setOnDetailsClose(true);
                        }}
                        width={120}
                        height={120}
                        src={`${imagePath}${item?.attachment[0]}`}
                        alt="Part"
                        className="w-[70px] h-[75px] object-cover cursor-pointer"
                      />

                    </div>


                    <div>

                      <h3 className="text-base font-bold flex gap-2">

                        {item.title}

                        <span
                          className={`text-[8px] capitalize self-end-safe px-2 py-1 rounded-full ${item.urgency === "high"
                            ? "bg-red-500"
                            : item.urgency === "normal"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            }`}
                        >
                          {item.urgency}
                        </span>

                      </h3>


                      <p className="text-xs text-neutralLight mt-1">
                        {item.vehicle_make} {item.vehicle_model}
                      </p>


                      <p className="text-[10px] mt-1">
                        Required By: {item.required_by_date}
                      </p>

                    </div>

                  </div>


                  {/* RIGHT */}
                  <div className="flex gap-3">

                    <button
                      onClick={() => {
                        setPartRequest(item);
                        setOnDetailsClose(true);
                      }}
                      className="bg-gray-500 cursor-pointer hover:bg-gray-600 duration-400 px-3 py-2 rounded-sm"
                    >
                      <FaEye />
                    </button>


                    <button
                      onClick={() => ModalOpen(item)}
                      className="bg-autoblue hover:bg-hoverblue cursor-pointer duration-400 px-6 py-2 rounded-sm"
                    >
                      Quote Now
                    </button>

                  </div>

                </div>

              ))

            ) : (

              <h1 className="text-center text-gray-400">
                No found
              </h1>

            )}

          </div>

        </div>


        {/* ================= PAGINATION ================= */}

        {pageLoad && (

          <div className="p-6">

            {loadingPage && (

              <div className="flex justify-center mb-4">
                <ImSpinner6 className="w-8 h-8 animate-spin" />
              </div>

            )}


            <div className="flex justify-center items-center text-white gap-3">

              <button
                onClick={() => {
                  setIsLoadingPage(true);
                  setCurrentPage((p) => p - 1);
                }}
                disabled={currentPage <= 1 || loadingPage}
                className="border cursor-pointer px-4 py-2 rounded disabled:opacity-50"
              >
                ⬅ Prev
              </button>


              <span className="text-sm">
                Page {metaPage.page} / {metaPage.total_pages}
              </span>


              <button
                onClick={() => {
                  setIsLoadingPage(true);
                  setCurrentPage((p) => p + 1);
                }}
                disabled={currentPage >= metaPage.total_pages || loadingPage}
                className="border cursor-pointer px-4 py-2 rounded disabled:opacity-50"
              >
                Next ➡
              </button>

            </div>

          </div>

        )}

      </div>


      {/* ================= MODALS ================= */}

      <BidModal
        open={modalOpen}
        userRequest={userRequest}
        onClose={() => setModalOpen(false)}
      />

 {onDetailsClose && (<>
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className=" relative w-full max-w-[1037px] bg-brandBlack rounded-sm shadow-lg p-[20px]">
            {/* Header (Image + Title + Button) */}
            <div className="flex justify-between flex-wrap gap-y-[20px] items-center">
              <div className="flex items-start gap-[15px]">
                <div className="relative bg-white  py-[7px] px-[7px] rounded-sm flex items-center justify-center overflow-hidden">
                  <Image
                    src={imagePath + partRequest?.attachment[0]}
                    alt="Filter"
                    width={150}
                    height={150}
                    className="object-cover md:w-[140px] md:h-[140px] w-[36px] h-[50px]"
                  />
                  <IoIosImages onClick={() => openGallery(
                    (partRequest?.attachment || []).filter(
                      (a): a is string => typeof a === "string"
                    )
                  )} className="absolute bottom-1 right-1 shadow-[0_1px_5px_#817f7f] cursor-pointer hover:bg-[#000] duration-600 bg-[#040404c7] text-white text-[33px] p-[4px] rounded-[5px]" />
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
                  {partRequest?.address?.address && (
                    <p className="text-[10px] leading-[22px] font-medium text-[#F8F8F8] mt-[5px]">
                      Delivery Address:{" "}
                      <span className="font-bold">
                        {partRequest?.address?.city}, {partRequest?.address?.province} ( {partRequest?.address?.postal_code} )
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-[30px]">
                <button onClick={() => setOnDetailsClose(false)} className="bg-white cursor-pointer h-8 w-8 rounded-full flex justify-center items-center text-black "><IoMdClose /></button>
                <button onClick={() => partRequest && ModalOpen(partRequest)} className="text-autoblue md:w-[auto] w-full cursor-pointer md:text-base text-sm leading-[14px] border border-autoblue py-[13px] px-[20px] duration-400 hover:text-white rounded-sm hover:bg-hoverblue hover:border-hoverblue">
                  Quote Now
                </button>
              </div>
            </div>
            <div>

            </div>

            {/* QUOTES LIST */}
            <div className="space-y-[10px] mt-[16px]">
              <div className="bg-[#011827] border border-[#153C51] rounded-sm pt-[5px] pb-[15px] ps-[12px] pe-[22px]">
                <p className="pt-3 md:text-sm text-xs leading-[22px] font-medium text-white mt-[5px]">
                  {partRequest?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <GalleryLoader onClose={setGalleryOpen} open={galleryOpen} images={selectGallery} />
      </>

      )}
      <GalleryLoader
        onClose={setGalleryOpen}
        open={galleryOpen}
        images={selectGallery}
      />

    </>
  );
}