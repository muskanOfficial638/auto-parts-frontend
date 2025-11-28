"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function BidListPage() {
  const parts = [
    {
      id: 1,
      title: "Filter Air Cleaner",
      desc: "Air Filter for Mahindra Scorpio N, Thar 2nd Gen",
      trim: "BMW A1 Trim",
      date: "20/11/2015",
    },
    {
      id: 2,
      title: "Filter Air Cleaner",
      desc: "Air Filter for Mahindra Scorpio N, Thar 2nd Gen",
      trim: "BMW A1 Trim",
      date: "20/11/2015",
    },
    {
      id: 3,
      title: "Filter Air Cleaner",
      desc: "Air Filter for Mahindra Scorpio N, Thar 2nd Gen",
      trim: "BMW A1 Trim",
      date: "20/11/2015",
    },
    {
      id: 4,
      title: "Filter Air Cleaner",
      desc: "Air Filter for Mahindra Scorpio N, Thar 2nd Gen",
      trim: "BMW A1 Trim",
      date: "20/11/2015",
    },
  ];

  return (
    <>
      <Header></Header>
      <div className="min-h-screen w-full relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />
        
        {/* Main Content */}
        <div className="relative z-10 flex justify-center pt-36 pb-20 px-4">
          {/* List Items */}
          <div className="space-y-6 w-full max-w-5xl rounded-lg shadow-lg ">
          <h2 className="text-xl font-bold pt-2 text-center">My bids</h2>
           <div className="text-xl pt-2 items-center flex space-x-6">
            <span className="font-bold cursor-pointer">Active</span>
            <span className="text-gray-400 cursor-pointer">Accepted</span>
            <span className="text-gray-400 cursor-pointer">Canceled</span>
            <span className="text-gray-400 cursor-pointer">Completed</span>
           </div>
            {parts.map((p) => (
              <div
                key={p.id}
                className="bg-[#12151B] p-6 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/productImage.png"
                    alt="Filter"
                    className="w-20 h-20 object-cover"
                  />

                  <div>
                    <h3 className="text-xl font-bold">
                      {p.title}{" "}
                      <span className="text-xs text-green-500 bg-green-900 px-2 py-0.5 rounded">
                        High
                      </span>
                    </h3>

                    <p className="text-sm text-gray-300 mt-1">{p.desc}</p>

                    <p className="text-xs text-gray-400 mt-1">{p.trim}</p>

                    <p className="text-xs text-gray-300 mt-1">
                      Required By: <span>{p.date}</span>
                    </p>
                  </div>
                </div>

                <button className="bg-autoblue hover:hoverblue px-6 py-2 rounded-lg">
                  Bid Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
