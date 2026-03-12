"use client";

import {
  EyeIcon,
  // PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { fetchAllBuyerPartRequests, imagePath } from "@/app/utils/api";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import { PartRequest } from "../common/interface";
import DeleteModal from "../buyer/modal/DeleteModal";
import { FaSort } from "react-icons/fa6";
import Image from "next/image";

type Urgency = "low" | "normal" | "high";
const urgencyOrder: Record<Urgency, number> = {
  low: 1,
  normal: 2,
  high: 3,
};
 
const statusCode = {
  0: { name: "Active", color: "text-white-500" },
  1: { name: "In Process", color: "text-yellow-500" },
  2: { name: "In Transit", color: "text-blue-500" },
  3: { name: "Completed", color: "text-green-500" },
  4: { name: "Cancelled", color: "text-red-500" },
};

export default function BuyerDashboard() {
  const [partRequestData, setPartRequestData] = useState<PartRequest[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | "all">("all");

  type SortKey = "title" | "urgency" | "required_by_date";

  const [sortConfig, setSortConfig] = useState<{
    key: SortKey | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  const columnKeyMap: Record<"Product" | "Urgency" | "Required", SortKey> = {
    Product: "title",
    Urgency: "urgency",
    Required: "required_by_date",
  };

  const handleUrgencySort = (column: "Product" | "Urgency" | "Required") => {
    const key = columnKeyMap[column];

    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    let result = partRequestData;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();

      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerSearch) ||
          item.vehicle_make.toLowerCase().includes(lowerSearch) ||
          item.vehicle_model.toLowerCase().includes(lowerSearch) ||
          item.vehicle_model_trim.toLowerCase().includes(lowerSearch) ||
          item.urgency.toLowerCase().includes(lowerSearch) ||
          item.required_by_date.toLowerCase().includes(lowerSearch),
      );
    }

    if (selectedStatus !== "all") {
      result = result.filter((item) => item.status === selectedStatus);
    }

    return result;
  }, [partRequestData, searchTerm, selectedStatus]);

  const sortedData = useMemo((): PartRequest[] => {
    const key = sortConfig.key;

    if (!filteredData) return [];

    if (!key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (key === "required_by_date") {
        return sortConfig.direction === "asc"
          ? new Date(a.required_by_date).getTime() -
              new Date(b.required_by_date).getTime()
          : new Date(b.required_by_date).getTime() -
              new Date(a.required_by_date).getTime();
      }

      if (key === "urgency") {
        const aUrgency = a.urgency as Urgency;
        const bUrgency = b.urgency as Urgency;

        return sortConfig.direction === "asc"
          ? urgencyOrder[aUrgency] - urgencyOrder[bUrgency]
          : urgencyOrder[bUrgency] - urgencyOrder[aUrgency];
      }

      // title
      const titleA = a.title.trim().toLowerCase();
      const titleB = b.title.trim().toLowerCase();

      return sortConfig.direction === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });
  }, [filteredData, sortConfig]);

  const router = useRouter();

  const refreshRequests = async () => {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (!loggedInUser.id) router.replace("/logout");
    const data = await fetchAllBuyerPartRequests(loggedInUser?.id);
    setPartRequestData(data);
    setIsLoading(false);
  };

  // Load on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (!loggedInUser.id) router.replace("/logout");
      const data = await fetchAllBuyerPartRequests(loggedInUser?.id);
      setPartRequestData(data);
      setIsLoading(false);
    };
    loadInitialData();
  }, [router]);

  useEffect(() => {}, [partRequestData]);

  function handleClick(item: PartRequest) {
    router.push(`/view-part-request?request=${item.id}`);
  }

  function ModalOpen(requestId: string | undefined) {
    if (!requestId) return;
    setRequestId(requestId);
    setModalOpen(true);
  }

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  const handleSelectChange = (value: string) => {
    console.log("value", value);
    setSelectedStatus(value === "all" ? "all" : Number(value));
  };
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
                      <div
                        className="flex justify-center cursor-pointer"
                        onClick={() => handleUrgencySort("Product")}
                      >
                        Product
                        <span className="mt-1 pl-2">
                          <FaSort />
                        </span>
                      </div>
                    </th>

                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Make
                    </th>
                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Model
                    </th>
                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Trim
                    </th>
                    <th className="bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      <div
                        className="flex justify-center cursor-pointer"
                        onClick={() => handleUrgencySort("Urgency")}
                      >
                        Urgency
                        <span className="mt-1 pl-2">
                          <FaSort />
                        </span>
                      </div>
                    </th>

                    <th className="bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      <div
                        className="flex justify-center cursor-pointer"
                        onClick={() => handleUrgencySort("Required")}
                      >
                        Required
                        <span className="mt-1 pl-2">
                          <FaSort />
                        </span>
                      </div>
                    </th>

                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      <select
                        name="role"
                        required
                        onChange={(e) => handleSelectChange(e.target.value)}
                        className="text-white outline-none  md:text-[13px] text-[11px]"
                      >
                        <option
                          value="all"
                          className="md:text-[13px] text-[11px] text-grayMedium"
                        >
                          Status
                        </option>
                        <option
                          value="0"
                          className="md:text-[13px] text-[11px] text-grayMedium"
                        >
                          Active
                        </option>
                        <option
                          value="1"
                          className="md:text-[13px] text-[11px] text-grayMedium"
                        >
                          In Process
                        </option>
                        <option
                          value="2"
                          className="md:text-[13px] text-[11px] text-grayMedium"
                        >
                          In Transit
                        </option>
                        <option
                          value="3"
                          className="md:text-[13px] text-[11px] text-grayMedium"
                        >
                          Completed
                        </option>
                        <option
                          value="4"
                          className="md:text-[13px] text-[11px] text-grayMedium"
                        >
                          Cancelled
                        </option>
                      </select>
                    </th>
                    <th className=" bg-autoblue rounded-tr-sm p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData && sortedData.length > 0 ? (
                    sortedData.map((item, index) => (
                      <tr
                        key={index}
                        className=" text-white border-b border-[#2C364A] "
                      >
                        {/* Product */}
                        <td
                          className="flex p-[10px] items-center gap-[15px] cursor-pointer"
                          onClick={() => handleClick(item)}
                        >
                          <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-sm">
                            <Image
                              src={`${imagePath}${item?.attachment[0]}`}
                              alt="product"
                              className="md:w-[45px] md:h-[50px] w-[35px] h-[45px] "
                              height={120}
                              width={120}
                            />
                          </div>
                          <span className="md:text-xs text-[10px] font-semibold md:leading-[22px] leading-[13px]">
                            {item.title}
                          </span>
                        </td>

                        <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.vehicle_make}
                        </td>
                        <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.vehicle_model}
                        </td>
                        <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.vehicle_model_trim}
                        </td>

                        {/* Urgency Badge */}
                        <td className="p-[10px]">
                          {/* <div className="text-[10px] capitalize font-medium leading-[15px] text-center text-white bg-[#52A84E] px-[9px] py-[2px] ms-auto me-auto w-[46px] rounded-[50px]">
                            {item.urgency}
                          </div> */}
                          <div
                            className={`text-[10px] capitalize font-medium leading-[15px] text-center text-white px-[9px] py-[2px] ms-auto me-auto w-[52px] rounded-[50px]
                             ${
                               item.urgency === "high"
                                 ? "bg-red-500"
                                 : item.urgency === "normal"
                                   ? "bg-yellow-500"
                                   : "bg-green-500"
                             }
                          `}
                          >
                            {item.urgency}
                          </div>
                        </td>

                        <td className="md:text-xs text-[10px] p-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.required_by_date}
                        </td>

                        <td
                          className={`md:text-xs text-[10px] md:leading-[22px] leading-[13px] p-[10px] font-semibold text-center ${statusCode[item.status as keyof typeof statusCode]?.color || "bg-gray-500"}
                           `}
                        >
                          {statusCode[item.status as keyof typeof statusCode]
                            ?.name || "Unknown"}
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
                            {/* <Link
                              href={`/request-part?request=${item?.id}`}
                              className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer"
                            >
                              <PencilSquareIcon className="h-[20px] w-[20px]" />
                            </Link> */}
                            <button
                              onClick={() => ModalOpen(item.id)}
                              className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer"
                            >
                              <TrashIcon className="h-[20px] w-[20px]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td colSpan={8} className="text-center p-3">
                      Part Request Not Found
                    </td>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        open={modalOpen}
        requestId={requestId}
        onClose={() => setModalOpen(false)}
        onDeleted={refreshRequests} // <-- notify parent
      />
    </>
  );
}
