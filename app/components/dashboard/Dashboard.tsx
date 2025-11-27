
import Link from "next/link";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const data = [
  {
    product: "Filter Air Cleaner",
    make: "BMW",
    model: "A1",
    trime: "2020",
    urgency: "High",
    required: "20/11/2015",
    status: "Active",
  },
  {
    product: "Filter Air Cleaner",
    make: "BMW",
    model: "A1",
    trime: "2020",
    urgency: "Low",
    required: "20/11/2015",
    status: "Completed",
  },
  {
    product: "Filter Air Cleaner",
    make: "BMW",
    model: "A1",
    trime: "2020",
    urgency: "High",
    required: "20/11/2015",
    status: "Cancelled",
  },
  {
    product: "Filter Air Cleaner",
    make: "BMW",
    model: "A1",
    trime: "2020",
    urgency: "High",
    required: "20/11/2015",
    status: "Active",
  },
  {
    product: "Filter Air Cleaner",
    make: "BMW",
    model: "A1",
    trime: "2020",
    urgency: "Low",
    required: "20/11/2015",
    status: "Completed",
  },
  {
    product: "Filter Air Cleaner",
    make: "BMW",
    model: "A1",
    trime: "2020",
    urgency: "High",
    required: "20/11/2015",
    status: "Cancelled",
  },
];

export default function Dashboard() {
    return(
<div className="min-h-screen w-full relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />
        {/* Page Content */}
        <div className="relative z-10 flex justify-center pb-20 px-4">
          <div className="w-full max-w-5xl p-8">
            {/* Search Bar */}
            <div className="flex justify-center my-8 pt-[5rem]">
              <div className="relative w-full max-w-3xl">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-white text-gray-600 rounded-lg py-3 pl-4 pr-12 border border-[#1f2d3a] focus:outline-none"
                />
                <div className="bg-autoblue text-white absolute right-0 top-0 p-2 rounded-l rounded-lg h-12.5">
                  <MagnifyingGlassIcon className="h-6 w-6 mt-1" />
                </div>
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-[#12151B] rounded-lg overflow-hidden border border-[#1f2d3a]">
              {/* Header */}
              <div className="grid grid-cols-8 bg-autoblue text-white font-semibold px-6 py-4 text-sm">
                <p>Product</p>
                <p>Make</p>
                <p>Model</p>
                <p>Trim</p>
                <p>Urgency</p>
                <p>Required</p>
                <p>Status</p>
                <p className="text-center">Action</p>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#1f2d3a]">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-8 items-center px-6 py-4 text-white"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/productImage.png"
                        alt="product"
                        className="w-12 h-12 rounded"
                      />
                      <span>{item.product}</span>
                    </div>

                    <p>{item.make}</p>
                    <p>{item.model}</p>
                    <p>{item.trime}</p>

                    {/* Urgency Badge */}
                     <span className="px-2 py-1 bg-green-600/80 text-white text-xs rounded-full w-[40px]">
                     {item.urgency}
                  </span>
                    

                    <p>{item.required}</p>

                    {/* Status Color */}
                    <p
                      className={`font-semibold ${
                        item.status === "Active"
                          ? "text-yellow-400"
                          : item.status === "Completed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 justify-center">
                      <Link
                        href="/view-part-request"
                        className="p-2 rounded border border-autoblue text-autoblue hover:bg-blue-500/20 cursor-pointer"
                      >
                        <EyeIcon className="h-5" />
                      </Link>
                      <Link
                        href="/request-part"
                        className="p-2 rounded border border-autoblue text-autoblue hover:bg-blue-500/20 cursor-pointer"
                      >
                        <PencilSquareIcon className="h-5" />
                      </Link>
                      <button className="p-2 rounded border border-autoblue text-autoblue hover:bg-blue-500/20 cursor-pointer">
                        <TrashIcon className="h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}