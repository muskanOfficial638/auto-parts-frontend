"use client";

import {

  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import {  fetchPayoutHistory } from "@/app/utils/api";
import Loader from "@/app/components/common/Loader";
import { useRouter } from "next/navigation";
import {  PayoutHistory } from "@/app/components/common/interface";



import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";


const statusCode = {
  "pending": { name: "Active", color: "text-white-500" },
  "in_process": { name: "In Process", color: "text-yellow-500" },
  "completed": { name: "Completed", color: "text-green-500" },
};

export default function BuyerDashboard() {
  const [partRequestData, setPartRequestData] = useState<PayoutHistory[]>([]);
  const [loading, setIsLoading] = useState(true);


  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 



  const filteredData = useMemo(() => {
    let result = partRequestData;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();

      result = result.filter(
        (item) =>
          item.order_id.toLowerCase().includes(lowerSearch) ||
          item.transfer_id.toLowerCase().includes(lowerSearch) ||
          item.amount_cents.toString().includes(lowerSearch) ||
          item.payout_status.toLowerCase().includes(lowerSearch) ||
          item.payout_updated_at.toLowerCase().includes(lowerSearch),
      );
    }

    return result;
  }, [partRequestData, searchTerm]);



  const router = useRouter();



  // Load on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (!loggedInUser.id) router.replace("/logout");
      const data = await fetchPayoutHistory(loggedInUser?.id, page, 50);

      console.log("Payout History Data:", data); // Debug log
      setPartRequestData(data.payouts);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    };
    loadInitialData();
  }, [router,page]);

  useEffect(() => {}, [partRequestData]);

  

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }


  return (
    <>
     <div className="">
          <Header />
      <div className="min-h-screen w-full relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b bg-gradient-to-b from-[#003253]/95 to-black/95" />
        {/* Page Content */}
        <div className="relative z-10 flex justify-center pb-20 px-4">
          <div className="w-full max-w-[1037px]  py-[30px]">
            {/* Search Bar */}
            <div className="flex justify-center my-8 pt-[5rem]">
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

            {/* Table Container */}
            <div className=" table-container overflow-auto">
              <table className="w-full border-0 bg-brandBlack text-white  rounded-sm">
                <thead>
                  <tr>
                    <th className="bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      
                        Order ID
                      
                     
                    </th>

                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Transfer ID
                    </th>

                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Account ID
                    </th>
                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Amount (cents)
                    </th>
            

                    <th className="bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                   
                      Date
                   
                    </th>

             
                    <th className=" bg-autoblue rounded-tr-sm p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr
                        key={index}
                        className=" text-white border-b border-[#2C364A] "
                      >
                        {/* Product */}
                        <td
                          className="flex p-[10px] items-center gap-[15px] cursor-pointer"
                          
                        >
                   
                          <span className="md:text-xs text-[10px] font-semibold md:leading-[22px] leading-[13px]">
                            {item.order_id} 
                          </span>
                        </td>

                         <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.transfer_id}
                        </td>

             
                        <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.acct_id}
                        </td>
                        <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.amount_cents}
                        </td>

            

                        <td className="md:text-xs text-[10px] p-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.payout_updated_at}
                        </td>

                        <td
                          className={`md:text-xs text-[10px] md:leading-[22px] leading-[13px] p-[10px] font-semibold text-center ${statusCode[item.payout_status as keyof typeof statusCode]?.color || "bg-gray-500"}
                           `}
                        >
                          {statusCode[item.payout_status as keyof typeof statusCode]
                            ?.name || "Unknown"}
                        </td>


                      </tr>
                    ))
                  ) : (
                    <td colSpan={8} className="text-center p-3">
                     Not Found
                    </td>
                  )}
                </tbody>
              </table>
              <div className="flex justify-center items-center gap-3 mt-6">
  <button
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
    className={`px-3 py-1 bg-autoblue text-white rounded disabled:opacity-50 ${page === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
  >
    Prev
  </button>

  <span className="text-white text-sm">
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
    className={`px-3 py-1 bg-autoblue text-white rounded disabled:opacity-50 ${page === totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
  >
    Next
  </button>
</div>
            </div>
          </div>
        </div>
      </div>


      </div>
      <Footer />
    </>
  );
}
