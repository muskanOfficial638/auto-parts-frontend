import { Suspense, useState } from "react";
import { AddresswithoutID } from "../common/interface";
import { CreateOrder, updateOrderStatus } from "@/app/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";


type SelectedData = {
  quoteId: string;
  userName: string;
  etaDays: string;
  priceCents: string;
  productName: string;
  address: AddresswithoutID;
};

type OrderCreateProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataSelect: SelectedData | null;
};

export default function OrderCreate({
  closeModal,
  dataSelect,
}: OrderCreateProps) {
  const router = useRouter();

  // ✅ Terms checkbox state
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function processToPay() {
    if (!isAgreed) {
      toast.error("Please accept Terms & Conditions first.");
      return;
    }

    setLoading(true);

    try {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");

      if (!loggedInUser?.id) {
        router.replace("/logout");
        return;
      }

      // ✅ Create Order
      const response = await CreateOrder({
        quote_id: dataSelect?.quoteId,
        buyer_id: loggedInUser?.id,
        address: dataSelect?.address,
      });

      if (!response?.data?.success) {
        toast.error("Failed to create order.");
        return;
      }

      closeModal(false);

      // ✅ Update Status
      const responseStatus = await updateOrderStatus(
        response.data.order_uid,
        {
          payment_meta: {
            paymentMethod: "COD",
            paymentStatus: "pending",
            paymentDate: new Date().toISOString(),
            amount: dataSelect?.priceCents || "0",
            transactionId: "",
            gateway: "COD",
            notes: "",
          },

          status: "in_process",
        }
      );

      if (responseStatus?.data?.status === "in_process") {
        toast.success("Order created successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    closeModal(false);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="absolute inset-0 flex items-center justify-center px-4 z-20 bg-gradient-to-b from-[#003253]/95 to-black/95">

        <div className="w-[700px] relative animate-slide max-w-full bg-brandBlack rounded-sm md:px-[40px] px-[20px] md:py-[50px] py-[30px]">

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-[15px] right-[15px] bg-white h-[40px] w-[40px] rounded-full font-bold text-red-500 cursor-pointer"
          >
            ✕
          </button>

          <div className="max-w-full mx-auto">

            {/* Payment Summary */}
            <div className="mt-[30px]">

              <h3 className="md:text-[22px] text-lg font-semibold text-white mb-[18px]">
                Payment Summary
              </h3>

              <div>
                <h4 className="text-sm mb-[7px] font-bold text-white">
                  Product Details:
                </h4>

                <div className="flex justify-between mb-[5px]">
                  <p className="text-xs font-semibold text-white">
                    {dataSelect?.productName}
                  </p>

                  <p className="text-xs font-semibold text-white">
                    Price : R {dataSelect?.priceCents}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-xs font-semibold text-white">
                    Delivery: {dataSelect?.etaDays} days
                  </p>

                  <p className="text-xs font-semibold text-white">
                    Supplier: {dataSelect?.userName}
                  </p>
                </div>
              </div>
            </div>

       
            <div className="mt-6 bg-gray-900 p-4 rounded-sm text-xs text-gray-300">

              <label className="flex items-start gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-1"
                />

                <span>
                  By clicking <b>Confirm and Pay</b>, you acknowledge that you
                  have read and agree to our{" "}
                  <Link className="text-autoblue" href="#">Terms & Conditions</Link>, <Link className="text-autoblue" href="#">Payment Terms</Link> and{" "}
                <Link className="text-autoblue" href="#"> Delivery Policy</Link>, and authorise the transaction to be
                  processed.
                  <br />
                  <br />
                  All sales are subject to our Terms & Conditions. Delivery times
                  are estimates. Prices include VAT unless stated otherwise.
                </span>

              </label>

            </div>

            {/* ✅ Proceed Button */}
            <button
              onClick={processToPay}
              disabled={!isAgreed || loading}
              className={`mt-[20px] w-full rounded-sm md:py-[16px] p-[13px] font-semibold text-white duration-300
              
              ${
                !isAgreed || loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-autoblue hover:bg-hoverblue cursor-pointer"
              }`}
            >
              {loading ? "Processing..." : "Confirm & Pay"}
            </button>

          </div>
        </div>
      </div>
    </Suspense>
  );
}