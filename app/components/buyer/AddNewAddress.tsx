import { Suspense, useEffect, useState } from "react";
import {AddNewAddressAPI} from "@/app/utils/api"
import { toast } from "react-toastify";
type OrderCreateProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  Changeaddress:React.Dispatch<React.SetStateAction<string>>;
};
export default function AddNewAddress({ closeModal, Changeaddress }: OrderCreateProps) {
  const autoPartsUserData = localStorage.getItem("autoPartsUserData");
  const loggedInUser = JSON.parse(autoPartsUserData || "{}");
  useEffect(() => {
    if (loggedInUser?.access_token) {
      // fetchBuyerAddress(loggedInUser.user.id, loggedInUser.access_token).then((data) => {
      //   setAddress(data?.data);
      //   console.log(data)
      // });
    }
  }, [loggedInUser]);

  const [formData, setFormData] = useState({
    address: "",
    name: "",
    city:"",
    province: "",
    postal_code: "",
    country: "ZA",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    console.log(formData)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (
    !formData.name.trim() ||
    !formData.address.trim() ||
    !formData.city.trim() ||
    !formData.province.trim() ||
    !formData.postal_code.trim() ||
    !formData.country.trim()
  ) {
    toast.error("Please fill in all required fields");
    return;
  }
     if (loggedInUser?.access_token) {
      
       AddNewAddressAPI(loggedInUser.user.id, formData, loggedInUser.access_token).then((data) => {
   


          if(data.data.success == "true"){
          const randomString = Math.random().toString(36).substring(2, 10);
          toast.success("Address Add successfully");
          Changeaddress(randomString);
          setTimeout(()=> closeModal(false),1000 )
         }
       });
    }
   

  };

  function handleClose() {
    closeModal(false);
   
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10 bg-gradient-to-b from-[#003253]/95 to-black/95">
        <div className="w-[700px] relative animate-slide  max-w-[100%] bg-brandBlack rounded-sm md:px-[40px] px-[20px]  md:py-[50px] py-[30px]">
          <button
            onClick={handleClose}
            className="absolute top-[15px] font-bold  right-[15px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
          >
            <span className="text-black">✕</span>
          </button>
          <div className="w-[808px] max-w-[100%] ms-[auto] me-[auto]">
            <h2 className="md:text-[22px] text-lg leading-[44px] font-semibold text-white mb-[30px]">
              Add New Address
            </h2>
                  <form className="space-y-[25px]" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                      value={formData.name}
                     onChange={handleChange}
                        className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                    value={formData.address}
                     onChange={handleChange}
                        className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                    <div className="flex justify md:flex-row flex-col between gap-[30px]">
                      <div className="w-full">
                        <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                            value={formData.city}
                           onChange={handleChange}
                          className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                          Province
                        </label>
                        <input
                          type="text"
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify md:flex-row flex-col between gap-[30px]">
                      <div className="w-full">
                        <label className="text-Gray text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                           Postal Code
                        </label>
                        <input
                          type="text"
                          name="postal_code"
                            value={formData.postal_code}
                     onChange={handleChange}
                          className="w-full py-[8px] px-[18px]  bg-white text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                          Country
                        </label>
                        <select                       
                          className="w-full py-[11px] px-[18px] bg-white  text-[14px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                        >
                          <option>
                            South Africa (ZA)
                          </option>                        
                        </select>
                      </div>
                    </div>
                    {/* Save Button */}
                  <button
                    type="submit"
                    className="bg-autoblue  md:text-[18px] text-white text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                  >
                    Save Address
                  </button>
                  </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
