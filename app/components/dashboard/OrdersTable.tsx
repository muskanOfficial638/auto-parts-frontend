"use client";

import {
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { fetchAllBuyerOrders, imagePath } from "@/app/utils/api";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import { OrdersType } from "../common/interface";

import { FaSort } from "react-icons/fa6";


export default function OrdersTable() {
 const [OrdersData, setOrdersData] = useState<OrdersType[]>([]);
  const [loading, setIsLoading] = useState(true);
 
  const [searchTerm, setSearchTerm] = useState("");


type SortKey = "title" | "orderID" | "created_at" | "quotedPrice";



const [sortConfig, setSortConfig] = useState<{
  key: SortKey | null;
  direction: "asc" | "desc";
}>({
  key: null,
  direction: "asc",
});

const columnKeyMap: Record<"Product" | "OrderID" | "Date" | "Price", SortKey> = {
  Product: "title",
  OrderID: "orderID",
  Date: "created_at",
  Price: "quotedPrice",
  
};

const handleUrgencySort = (
  column: "Product" | "OrderID" | "Date" | "Price"
) => {
  const key = columnKeyMap[column];

  const direction =
    sortConfig.key === key && sortConfig.direction === "asc"
      ? "desc"
      : "asc";

  setSortConfig({ key, direction });
};

const filteredData = useMemo(() => {
  if (!searchTerm) return OrdersData;

  const lowerSearch = searchTerm.toLowerCase();

  return OrdersData.filter((item) =>
    item.productTitle.toLowerCase().includes(lowerSearch) ||
    item.orderID.toLowerCase().includes(lowerSearch) ||
    item.status.toLowerCase().includes(lowerSearch) ||
    item.quotedPrice.toString().includes(lowerSearch) ||
    item.created_at.toLowerCase().includes(lowerSearch)
  );
}, [OrdersData, searchTerm]);


const sortedData = useMemo((): OrdersType[] => {
  const key = sortConfig.key;



  if (!filteredData) return [];

  if (!key) return filteredData;

  return [...filteredData].sort((a, b) => {
    if (key === "created_at") {
      return sortConfig.direction === "asc"
        ? new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime();
    }

    if (key === "quotedPrice") {
      return sortConfig.direction === "asc"
        ? a.quotedPrice - b.quotedPrice
        : b.quotedPrice - a.quotedPrice;
    }

    if (key === "orderID") {
      const orderIDA = a.orderID.trim().toLowerCase();
      const orderIDB = b.orderID.trim().toLowerCase();  
      return sortConfig.direction === "asc"
        ? orderIDA.localeCompare(orderIDB)
        : orderIDB.localeCompare(orderIDA);
    } 
    // title
const titleA = a.productTitle.trim().toLowerCase();
const titleB = b.productTitle.trim().toLowerCase();

return sortConfig.direction === "asc"
  ? titleA.localeCompare(titleB)
  : titleB.localeCompare(titleA);
  });


}, [filteredData, sortConfig]);



  const router = useRouter();


  // Load on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (!loggedInUser?.access_token) return;

      const data = await fetchAllBuyerOrders(
        loggedInUser.user?.id,
        loggedInUser.access_token
      );
      setOrdersData(data);
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  useEffect(() => {}, [OrdersData]);

  function handleClick(item: OrdersType) {
    router.push(`orders/${item.id}`);
  }



  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
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
                      <div className="flex justify-center cursor-pointer"  onClick={() => handleUrgencySort('Product')} >
                      Product
                      <span
                        className="mt-1 pl-2"
                      >
                        <FaSort />
                      </span>
                      </div>
                    </th>

                      <th className="bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      <div className="flex justify-center cursor-pointer"  onClick={() => handleUrgencySort('OrderID')} >
                      Order ID
                      <span
                        className="mt-1 pl-2"
                      >
                        <FaSort />
                      </span>
                      </div>
                    </th>


                                        <th className="bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      <div className="flex justify-center cursor-pointer"  onClick={() => handleUrgencySort('Date')} >
                      Date
                      <span
                        className="mt-1 pl-2"
                      >
                        <FaSort />
                      </span>
                      </div>
                    </th>
                    <th className="bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      <div className="flex justify-center cursor-pointer"  onClick={() => handleUrgencySort('Price')} >
                      Price
                      <span
                        className="mt-1 pl-2"
                      >
                        <FaSort />
                      </span>
                      </div>
                    </th>

                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Status
                    </th>
                    <th className=" bg-autoblue rounded-tr-sm p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData && sortedData.length ? (
                    sortedData.map((item, index) => (
                      <tr
                        key={index}
                        className=" text-white border-b border-[#2C364A] "
                      >
                        {/* Product */}
                        <td className="flex p-[10px] items-center gap-[15px]">
                          <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`${imagePath}${item?.productImage}`}
                              alt="product"
                              className="md:w-[28px] md:h-[39px] w-[22px] h-[22px] "
                            />
                          </div>
                          <span className="md:text-xs text-[10px] font-semibold md:leading-[22px] leading-[13px]">
                            {item.productTitle}
                          </span>
                        </td>


                        <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.orderID}
                        </td>


             
                        
                        {/* Urgency Badge */}
                        <td className="p-[10px]">
                          {/* <div className="text-[10px] capitalize font-medium leading-[15px] text-center text-white bg-[#52A84E] px-[9px] py-[2px] ms-auto me-auto w-[46px] rounded-[50px]">
                            {item.urgency}
                          </div> */}
                          <div
                            className={`text-[10px] capitalize font-medium leading-[15px] text-center text-white px-[9px] py-[2px] ms-auto me-auto rounded-[50px]`}
                          >
                            {item.created_at}
                          </div>
                        </td>

            <td className="md:text-xs text-[10px] p-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.quotedPrice}
                        </td>

                        {/* Status Color */}
                        <td
                          className={`md:text-xs text-[10px] md:leading-[22px] leading-[13px] p-[10px] font-semibold text-center ${
                            item.status === 'PENDING'
                              ? "text-yellow-400"
                              : item.status === 'COMPLETED'
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.status === 'PENDING'
                            ? "Pending"
                            : item.status === 'COMPLETED'
                            ? "Completed"
                            : "Suspend"}
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="flex gap-3 p-[10px] justify-center">
                            <button
                              onClick={() => handleClick(item)}
                              className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer"
                            >
                              <EyeIcon className="h-[20px] w-[20px]" />
                            </button>
                   
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h1 className="text-center text-gray-900">
                      No Users found.
                    </h1>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
