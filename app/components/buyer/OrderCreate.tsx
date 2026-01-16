import { Suspense, useState, useEffect } from "react";
import AddNewAddress from "./AddNewAddress";
import { fetchBuyerAddress, CreateOrder } from "@/app/utils/api"
import DeleteAddressModal from "../buyer/modal/DeleteAddressModal";
import {TrashIcon } from "@heroicons/react/24/outline";

type SelectedData = {
  quoteId: string;
  requestId: string;
  userName: string;
  etaDays: string;
  priceCents: string;
  productName: string;
};

type OrderCreateProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataSelect: SelectedData | null;
};

interface AddressType {
  id: string;
  address: string;
  name: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}


export default function OrderCreate({ closeModal, dataSelect }: OrderCreateProps) {

  const [isOpenAddAddress, setisOpenAddAddress] = useState(false);
  const [changeaddress, setChangeaddress] = useState("");
  const [address, setAddress] = useState<AddressType[]>();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleAddressID, setDeleAddressID] = useState('');

  useEffect(() => {
    console.log("dataSelect", dataSelect);
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    if (loggedInUser?.access_token) {
      fetchBuyerAddress(loggedInUser.user.id, loggedInUser.access_token).then((data) => {
        const reversed = [...(data?.data || [])].reverse();
        setAddress(reversed);
       
      });


    }
  }, [changeaddress]);

  function processToPay() {


    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    const selectedAddress = (document.querySelector('input[name="address"]:checked') as HTMLInputElement)?.value;
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

  if (loggedInUser?.access_token) {
      CreateOrder({
  quote_id: dataSelect?.quoteId || "",
  buyer_id: loggedInUser.user.id,
  shipping_to_address_id: selectedAddress
},loggedInUser?.access_token).then((data) => {

        console.log(data)

      });
    }

  }

  // Proceed with payment processing using selectedAddress
  function deleteHandeler(addressId: string) {
    setDeleAddressID(addressId)
    setModalOpen(true)
  }
  function handleClose() {
    closeModal(false);
  }
  function handleAddressModalClose() {
    setisOpenAddAddress(true);
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
            <h2 className="md:text-4xl text-lg leading-[44px] font-bold text-white mb-[30px]">
              Select Delivery Address
            </h2>
            <div className="space-y-[25px]">

              {!address ? (
                <div className="flex justify-center items-center h-24">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : address.length === 0 ? (
                <p className="text-white">No address found, please add your address</p>
              ) : (
                address.map((data, index) => (

                  <label key={index} className="flex items-start gap-[10px] p-[10px] rounded-sm border border-[#153C51] bg-[#011827] cursor-pointer">
                    <input
                      type="radio"
                      name="address"
                      value={data.id}
                      defaultChecked={index === 0}
                      className="mt-1 h-[16px] w-[16px] autoblue"
                    />
                    <div>
                      <p className="text-white font-semibold leading-[16px] text-[13px]">
                        {data?.name}:
                      </p>
                      <p className="mt-[5px] text-white text-xs">
                        {data?.address}, {data?.city}, {data?.province}, {data?.postal_code}, {data?.country}
                      </p>
                    </div>
                    <div className="ml-auto my-auto" onClick={() => deleteHandeler(data.id)}>   <TrashIcon className="h-[20px] w-[20px] text-red-500" />

                    </div>

                  </label>
                )))}

            </div>
            {/* Save Button */}
            <button onClick={() => handleAddressModalClose()}
              type="submit"
              className="bg-autoblue mt-[30px] md:text-[18px] text-white text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
            >
              Add New Address
            </button>
            <div className="mt-[30px]">
              <h3 className="md:text-[22px] text-lg leading-[36px] font-semibold text-white mb-[18px]">
                Payment Summary
              </h3>
              <div>
                <h4 className="text-sm mb-[7px] leading-[22px] font-bold text-white">Product Details:</h4>
                <div className="flex justify-between items-center mb-[5px]">
                  <p className="text-xs leading-[15px] font-semibold text-white">{dataSelect?.productName}</p>
                  <p className="text-xs leading-[15px] font-semibold text-white">Price : {dataSelect?.priceCents}</p>
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
 <div>
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
    </div>
            
          </div>
        </div>
      </div>
      
      {isOpenAddAddress &&
        <AddNewAddress closeModal={setisOpenAddAddress} Changeaddress={setChangeaddress} />}
      <DeleteAddressModal
        open={modalOpen}
        addressId={deleAddressID}
        onClose={setModalOpen}
        onDeleted={setChangeaddress}
      />
    </Suspense>



  );
}
