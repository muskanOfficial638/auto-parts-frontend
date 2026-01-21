/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FiChevronDown, FiXCircle   } from "react-icons/fi";
import BidModal from "@/app/components/supplier/Modal/BidModal";
import { fetchAllSupplierPartRequests, imagePath } from "@/app/utils/api";
import { PartRequest } from "../common/interface";
import Loader from "../common/Loader";

export default function SupplierDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [partRequestData, setPartRequestData] = useState<PartRequest[]>();
  const [filterpartRequestData, setFilterPartRequestData] = useState<PartRequest[]>();
  const [userRequest, setUserRequest] = useState<PartRequest>();
  const [sideBarFilters, setSideBarFilters] = useState("");
  const [activeTrim, setActiveTrim] = useState<string | number |null>(null);

  interface FiltersOpen {
    make: boolean;
    [key: string]: boolean; // <-- allows any string key
  }

  const [filtersOpen, setFiltersOpen] = useState<FiltersOpen>({
    make: true,
    bmw: false,
    a1: false
  });


  const [loading, setIsLoading] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");
  const carData = {
    "cars": [
      {
        "brand": "BMW",
        "models": [
          {
            "model": "F-161",
            "trims": [{"name": "Platinum", id: 1}, {"name": "1.2PSI", id: 2}]
          },
          {
            "model": "X5",
            "trims": [{"name": "Sport", id: 3}, {"name": "Luxury", id: 4}]
          }
        ]
      },
      {
        "brand": "Ford",
        "models": [
          {
            "model": "Micra",
            "trims": [{"name": "Base", id: 5}, {"name": "Platinum", id: 6}]
          },
          {
            "model": "F-150",
            "trims": [{"name": "XL", id: 7}, {"name": "XLT", id: 8}]
          }
        ]
      },
      {
        "brand": "Honda",
        "models": [
          {
            "model": "Civic",
            "trims": [{"name": "LX", id: 11}, {"name": "EX", id: 12}]
          },
          {
            "model": "Accord",
            "trims": [{"name": "Sport", id: 9}, {"name": "Touring", id: 10}]
          }
        ]
      }
    ]
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (loggedInUser?.access_token) {
        fetchAllSupplierPartRequests(loggedInUser.access_token).then((data) => {
          setPartRequestData(data);
          setIsLoading(false);
        });
      }
    }
  }, []);

  useEffect(() => {
    const delayFilter = setTimeout(() => {
      const search = globalSearch.toLowerCase();
      let filtered1 = [] as any;

      if (sideBarFilters && partRequestData) {
        filtered1 = partRequestData.filter((item) => {
          console.log("sideBarFilters", sideBarFilters)
          return (
            item.vehicle_model_trim?.toLowerCase().includes(sideBarFilters.toLowerCase())
          );
        });
      } else {
        filtered1 = partRequestData;
      }

      if (search && partRequestData) {
        filtered1 = filtered1.filter((item:any) => {
          return (
            item.title?.toLowerCase().includes(search) ||
            item.description?.toLowerCase().includes(search) ||
            item.urgency?.toLowerCase().includes(search) ||
            item.vehicle_make?.toLowerCase().includes(search) ||
            item.vehicle_model?.toLowerCase().includes(search)
          );
        });
      } else if (!sideBarFilters && !search) {
        setFilterPartRequestData(partRequestData || []);
      }

      setFilterPartRequestData(filtered1);
    }, 300);


    return () => clearTimeout(delayFilter);

  }, [globalSearch, partRequestData, sideBarFilters]);

  const handleGlobalSearch = (e: any) => {
    setGlobalSearch(e.target.value);
  };

  function ModalOpen(requestData: PartRequest) {
    // console.log("requestData",requestData)
    setUserRequest(requestData);
    setModalOpen(true);
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
      <div
        className="min-h-screen md:flex bg-cover bg-center relative"
        style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
      >
        {/* Gradient Overlay */}
        <div className="absolute top-[0] bottom-[0] h-full w-full bg-gradient-to-b from-[#003253]/95 to-black/95" />
        {/* Sidebar */}
        <div className="relative md:w-72 bg-brandBlack text-white fixed">
          <div className="bg-autoblue md:mt-[6rem] mt-[80px] md:py-2 py-[3px]" />
          <div className="md:px-[20px] md:py-[40px] p-[20px]">
            <h2 className="md:text-2xl text-lg mb-[20px] leading-[14px]  font-bold ">
              Filters Parts
            </h2>
            {/* MAKE FILTER */}

            <div className=" bg-black p-[20px] ">
              <h4 className="md:text-[19px] text-base text-white font-semibold">
                Make
              </h4>

              {filtersOpen.make && (
                <div className="mt-2 space-y-2 text-gray-300">
                  {carData.cars.map((car) => (
                    <div key={car.brand}>
                      {/* Brand */}
                      <button
                        onClick={() =>
                          setFiltersOpen({
                            ...filtersOpen,
                            [car.brand]: !filtersOpen[car.brand],
                          })
                        }
                        className="flex justify-between cursor-pointer w-full text-left items-center text-LightGray border-Dark font-medium text-xs leading-[33px] border-b"
                      >
                        {car.brand}
                        <FiChevronDown
                          className={
                            filtersOpen[car.brand]
                              ? "rotate-180 text-[18px] text-LightGray"
                              : "text-[18px]"
                          }
                        />
                      </button>

                      {filtersOpen[car.brand] && (
                        <div className="space-y-2 text-gray-400">
                          {car.models.map((model) => (
                            <div key={model.model}>
                              {/* Model */}
                              <button
                                onClick={() =>
                                  setFiltersOpen({
                                    ...filtersOpen,
                                    [model.model]: !filtersOpen[model.model],
                                  })
                                }
                                className="flex justify-between cursor-pointer w-full text-left ps-[10px] items-center text-grayMedium border-Dark text-xs font-medium leading-[33px] border-b"
                              >
                                {model.model}
                                <FiChevronDown
                                  className={
                                    filtersOpen[model.model]
                                      ? "rotate-180 text-[18px] text-LightGray"
                                      : "text-[18px] text-LightGray"
                                  }
                                />
                              </button>

                              {filtersOpen[model.model] && (
                                <div className="space-y-2 text-grayMedium font-medium items-center text-xs leading-[33px]">
                                  {model.trims.map((trim, index) => (
                                    <p
                                     
                                      key={trim.id}
                                      className={`flex justify-between items-center ps-[30px] ${index !== model.trims.length - 1
                                          ? "border-b border-Dark"
                                          : ""
                                        } font-medium ` + (activeTrim === trim.id ? "bg-autoblue text-white" : "")}
                                    >
                                      <span  className="w-full cursor-pointer" onClick={() => {setSideBarFilters(trim.name); setActiveTrim(trim.id)}}>{trim.name}</span>
                                  <span className=" mr-[20px] cursor-pointer" onClick={()=>{setActiveTrim(""); setSideBarFilters("")}}><FiXCircle  className="text-[12px] ml-[5px]" /></span>
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="relative flex-1 md:p-10 p-[20px] text-white overflow-auto h-auto">
          {/* Search Bar */}
          <div className="flex justify-center md:my-8 md:pt-[5rem] mb-[20px]">
            <div className="relative w-full max-w-[583px]">
              <input
                type="text"
                placeholder="Search"
                onChange={handleGlobalSearch}
                // onChange={onSearchPartRequest}
                className="w-full bg-white text-sm text-grayMedium placeholder-grayMedium leading-[17px] rounded-sm py-[10px] px-[15px] border border-[#1f2d3a] focus:outline-none"
              />
              <div className="bg-autoblue text-white absolute right-0 flex  rounded-r-sm items-center h-full top-0 py-[10px] px-[13px] ">
                <MagnifyingGlassIcon className="h-[14px] w-[14px]" />
              </div>
            </div>
          </div>

          {/* List Items */}
          <div className="space-y-[10px]">
            {filterpartRequestData ? (
              filterpartRequestData.map((item) => (
                <div
                  key={item.id}
                  className="bg-brandBlack p-[20px] rounded-lg flex flex-wrap lg:gap-[0] gap-y-[20px] items-center justify-between"
                >
                  <div className="flex md:items-center items-start gap-4">
                    <div className="bg-white py-[11px] px-[18px] md:mt-[0] mt-[4px] rounded-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${imagePath}${item?.attachment}`}
                        alt="Filter"
                        className="md:w-[43px] md:h-[59px] w-[30px] h-[46px] object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base leading-[22px] font-bold flex items-center gap-[8px]">
                        {item.title}{" "}
                        <span className="text-[8px] font-medium leading-[10px] text-white bg-[#52A84E] px-[9px] py-[1px] rounded-[50px]">
                          {item.urgency}
                        </span>
                      </h3>

                      <p className="md:text-sm text-xs leading-[22px] font-medium text-white mt-[5px]">
                        {item.description}
                      </p>

                      <p className="text-xs leading-[15px] font-medium text-neutralLight mt-[5px]">
                        {item.vehicle_make} {item.vehicle_model}{" "}
                        {item.vehicle_model_trim}
                      </p>

                      <p className="text-[10px] font-medium text-[#F8F8F8] mt-[5px]">
                        Required By: <span>{item.required_by_date}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    className="bg-autoblue md:text-base text-sm font-semibold leading-[14px] hover:bg-hoverblue md:w-[auto] w-full duration-400 px-[44px] md:py-[13px] py-[10px] rounded-sm cursor-pointer"
                    onClick={() => ModalOpen(item)}
                  >
                    Quote Now
                  </button>
                </div>
              ))
            ) : (
              <h1 className="text-center text-gray-900">No Users found.</h1>
            )}
          </div>
        </div>
      </div>

      <BidModal
        open={modalOpen}
        userRequest={userRequest}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
// 🔍 Debounce utility

// const debounce = (func: Function, delay: number) => {
//   let timer: any;
//   return (...args: any[]) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// };
