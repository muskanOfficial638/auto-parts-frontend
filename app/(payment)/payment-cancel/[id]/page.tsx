// app/(payment)/payment-success/[id]/page.tsx

import { updateOrderStatus } from "@/app/utils/api";

import Stripe from "stripe";
import { cookies } from "next/headers";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { MdCancel } from "react-icons/md";
import {
  ArrowLeft,
  Building,
  Calendar,
  CreditCard,


} from "lucide-react";

import Link from "next/link";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CancelPage({ params }: Props) {

  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("ATXAT")?.value;
  const session = await stripe.checkout.sessions.retrieve(id);

   const date = new Date(session.created * 1000);

const formatted =
  date.toLocaleDateString("en-GB") +
  " " +
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const payload = {
    payment_meta: {
      paymentMethod: session.payment_method_types[0] || "",
      paymentStatus: session.payment_status || "",
      paymentDate: session.created
        ? new Date(session.created * 1000).toISOString()
        : new Date().toISOString(),
      amount: (session.amount_total || 0) / 100 || "0",
      transactionId: session.payment_intent || "",
      gateway: "Stripe",
      notes: "",
    },
    status: "pending",
  };

  if (session.payment_status === "unpaid" && token) {
    const responseStatus = await updateOrderStatus(
      session.metadata?.id || "",
      payload,
      token,
    );

    if (responseStatus?.data?.status === "in_process") {
      // toast.success("Order created successfully!");
      // window.location.reload();
    }
  }
  return (
    <main className=" bg-black text-white overflow-hidden">
      <Header />
      <div className=" w-full relative ">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-[20px] "
          style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" />
        <div className="relative flex justify-center">
          {/* Page Content */}
          <div className="flex justify-center items-center bg-brandBlack " style={{ marginTop: '120px', marginBottom: '50px' }}>
            <div className="w-full max-w-[520px] ">
              {/* Main Card */}
              <div className=" rounded-2xl shadow-xl overflow-hidden">
                {/* Success Header */}
                <div className="p-8 pb-4 text-center">
  
                  <div className="flex justify-center  " style={{fontSize:'50px'}}>
                      <MdCancel
                        className="text-red-500"
                      />
     
                  </div>

                  <h1 className="text-2xl font-bold text-red-500 mb-2">
                    Payment Cancelled!
                  </h1>

                  <p className="text-gray-400 text-sm">
                    Your payment was cancelled. If this was a mistake, you can try again.
                  </p>
                </div>

                {/* Payment Details Card */}
                <div className="mx-6 rounded-xl p-5 space-y-4">
                  {/* Amount */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100 text-sm">Amount</span>
                    <span className="text-2xl font-bold text-white">
                      R {session?.amount_total ? (session.amount_total / 100).toFixed(2) : "0.00"}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>

     

                  {/* Payment Method */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-100 text-sm">
                        Payment Method
                      </span>
                    </div>
                    <span className="text-gray-100 text-sm uppercase">
                      {session?.payment_method_types[0] || "N/A"}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-100 text-sm">Date</span>
                    </div>
                    <span className="text-gray-100 text-sm">
                      {formatted}
                    </span>
                  </div>

                  {/* Merchant */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-100 text-sm">Order ID</span>
                    </div>
                    <span className="text-gray-100 text-sm font-medium">
                      {session?.metadata?.orderId}
                    </span>
                  </div>
                </div>

     
                {/* Divider */}
                <div className="border-t border-gray-100 mx-1"></div>

                {/* Return to Store Button */}
                <div className="p-6">
                  <Link
                    href="/orders"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-autoblue rounded-lg text-white font-medium hover:bg-hoverblue transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    My Orders
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
