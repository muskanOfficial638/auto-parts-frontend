import { Suspense } from "react";
import { AddresswithoutID } from "../common/interface";
import { CreateOrder, updateOrderStatus } from "@/app/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type SelectedData = {
  quoteId: string;
 
  userName: string;
  etaDays: string;
  priceCents: string;
  productName: string;
  address: AddresswithoutID ;
};

type OrderCreateProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataSelect: SelectedData | null;
};


 
export default function OrderCreate({ closeModal, dataSelect }: OrderCreateProps) {

  
const router = useRouter();
  async function processToPay() {

    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (!loggedInUser.id) router.replace("/logout");

    

   const response = await CreateOrder(
      {
        quote_id: dataSelect?.quoteId,
        buyer_id: loggedInUser?.id,
        address: dataSelect?.address,
      }
    );

    console.log("Order creation response:", response);
    if (response.data.success === true) {
     
      closeModal(false);
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
            notes: ""
          
          },
          
          status: "in_process",
        }
      );

      if (responseStatus.data.status === "in_process") {
      console.log("Order status update response:", responseStatus); 
      toast.success(
             "Order created successfully!"
            );
            window.location.reload();

      }
    } else {
      alert("Failed to create order. Please try again.");
    }
 

  }

  // Proceed with payment processing using selectedAddress
  function handleClose() {
    closeModal(false);
  }
  return (

    <Suspense fallback={<div>Loading...</div>}>
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10 bg-gradient-to-b from-[#003253]/95 to-black/95 z-20 ">
        <div className="w-[700px] relative animate-slide  max-w-[100%] bg-brandBlack rounded-sm md:px-[40px] px-[20px]  md:py-[50px] py-[30px]">
          <button onClick={handleClose}
            className="absolute top-[15px] font-bold  right-[15px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
          >
            <span className="text-black">✕</span>
          </button>
          <div className="w-[808px] max-w-[100%] ms-[auto] me-[auto]">

            <div className="mt-[30px]">
              <h3 className="md:text-[22px] text-lg leading-[36px] font-semibold text-white mb-[18px]">
                Payment Summary
              </h3>
              <div>
                <h4 className="text-sm mb-[7px] leading-[22px] font-bold text-white">Product Details:</h4>
                <div className="flex justify-between items-center mb-[5px]">
                  <p className="text-xs leading-[15px] font-semibold text-white">{dataSelect?.productName}</p>
                  <p className="text-xs leading-[15px] font-semibold text-white">Price : R {dataSelect?.priceCents}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs leading-[15px] font-semibold text-white">Delivery: {dataSelect?.etaDays} days</p>
                  <p className="text-xs leading-[15px] font-semibold text-white">Supplier: {dataSelect?.userName}</p>
                </div>
              </div>
            </div>
            <button
           onClick={processToPay}
              className="bg-autoblue mt-[15px] md:text-[18px] text-white text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
            >
              Proceed to pay
            </button>
 {/* <div>
      <h2>Pay with PayFast</h2>

      <form
        action="https://sandbox.payfast.co.za/eng/process"
        method="post"
      >

        <input type="hidden" name="merchant_id" value="10000100" />
        <input type="hidden" name="merchant_key" value="46f0cd694581a" />

   
        <input type="hidden" name="amount" value="100.00" />
        <input type="hidden" name="item_name" value="Test Order" />
        <input type="hidden" name="m_payment_id" value="ORDER_123" />

 
        <input
          type="hidden"
          name="return_url"
          value="http://localhost:3000/success"
        />
        <input
          type="hidden"
          name="cancel_url"
          value="http://localhost:3000/cancel"
        />
        <input
          type="hidden"
          name="notify_url"
          value="http://localhost:3000/api/payfast/ipn"
        />

        <button type="submit">Pay Now</button>
      </form>
    </div> */}
            
          </div>
        </div>
      </div>
      

    </Suspense>



  );
}
