"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

import { addBankDetails, deleteBankDetails, GetBankDetails, viewProfile } from "@/app/utils/api";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export interface UserProfile {
  first_name: string;
  last_name: string;
  phone: string;
  id_number: string;
  email: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  account_holder_name: string;
  routing_number: string;
  account_number: string;
  status?: string;
  acct_id?: string;
  id?: string;
}
const formatSouthAfricaPhone = (phone: string) => {
  let cleaned = phone.replace(/\D/g, "");
  cleaned = cleaned.replace(/^0+/, "");
  return `+27${cleaned}`;
};
export default function MyAccountForm() {
  const [loading, setLoading] = useState(true);
  const [isEdit, SetEdit] = useState(false);
  const [submitProcess, setSubmitProcess] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [OpenDelete, setOpenDelete] = useState(false);

  const [profileData, setProfileData] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    phone: "",
    id_number: "",
    dob: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    account_holder_name: "",
    routing_number: "",
    account_number: "",
  });
   async function handleDeletePartRequest() {
  
   if(!profileData?.acct_id){
      setOpenDelete(false);
      return;  
   }

   try {
 const res = await  deleteBankDetails(profileData?.acct_id);
 console.log(res?.data)
  if (res?.data?.success) {
    setProfileData((prev) => ({
      ...prev,
    first_name: "",
    last_name: "",
    phone: "",
    id_number: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    account_holder_name: "",
    routing_number: "",
    account_number: "",
    acct_id: "",
    }));
    setOpenDelete(false);
    setAlreadySubmitted(false);  
  toast.success(res?.data?.message || "Bank details deleted successfully");
 }
 else{
  toast.error(res?.data?.message || "Failed to delete bank details");
 }

} catch (error) {
      console.log("Update Error:", error);
  
    }

  }
  const validateForm = () => {
    if (!profileData.first_name.trim()) {
      toast.error("First name is required");
      return false;
    } else if (!/^[A-Za-z]+$/.test(profileData.first_name)) {
      toast.error("First name can only contain letters");
      return false;
    }

    if (!profileData.last_name.trim()) {
      toast.error("Last name is required");
      return false;
    } else if (!/^[A-Za-z]+$/.test(profileData.last_name)) {
      toast.error("Last name can only contain letters");
      return false;
    }

    // Phone
    if (!profileData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    } else if (!/^[0-9]+$/.test(profileData.phone)) {
      toast.error("Phone number can only contain digits");
      return false;
    }

    const formattedPhone = formatSouthAfricaPhone(profileData.phone);

    if (!/^\+27\d{9}$/.test(formattedPhone)) {
      toast.error("Enter valid South African phone number");
      return false;
    }

    // DOB
    if (!profileData.dob) {
      toast.error("Date of birth is required");
      return false;
    }

    // National ID
    if (!profileData.id_number.trim()) {
      toast.error("National ID number is required");
      return false;
    }

    // Address
    if (!profileData.address.trim()) {
      toast.error("Address is required");
      return false;
    }

    // City
    if (!profileData.city.trim()) {
      toast.error("City is required");
      return false;
    }

    // State
    if (!profileData.state.trim()) {
      toast.error("State is required");
      return false;
    }

    // Postal Code
    if (!profileData.postal_code.trim()) {
      toast.error("Postal code is required");
      return false;
    }

    const postalRegex = /^[A-Za-z0-9\- ]{4,10}$/;

    if (!postalRegex.test(profileData.postal_code)) {
      toast.error("Enter valid postal code");
      return false;
    }

    // Account Holder Name
    if (!profileData.account_holder_name.trim()) {
      toast.error("Account holder name is required");
      return false;
    } else if (!/^[A-Za-z]+$/.test(profileData.account_holder_name)) {
      toast.error("Account holder name can only contain letters");
      return false;
    }

    // Routing Number
    if (!profileData.routing_number.trim()) {
      toast.error("Routing number is required");
      return false;
    }

    const routingRegex = /^[0-9A-Za-z]{6,18}$/;

    if (!routingRegex.test(profileData.routing_number)) {
      toast.error("Enter valid routing number");
      return false;
    }

    // Account Number
    if (!profileData.account_number.trim()) {
      toast.error("Account number is required");
      return false;
    }

    const accountRegex = /^[0-9]{6,20}$/;

    if (!accountRegex.test(profileData.account_number)) {
      toast.error("Enter valid account number");
      return false;
    }

    return true;
  };
  const router = useRouter();
  // Load user data from localStorage

  useEffect(() => {
  if (typeof window === "undefined") return;

  const loggedInUser = JSON.parse(
    localStorage.getItem("autoPartsUserData") || "{}"
  );

  if (!loggedInUser?.id) {
    router.replace("/logout");
    return;
  }

  Promise.all([
    viewProfile(loggedInUser.id),
    GetBankDetails(loggedInUser.id),
  ]).then(([profile, bank]) => {
    setLoading(false);

      setProfileData((prev) => ({
            ...prev,
            email: profile?.email || "",
          }));

    if (bank?.success) {
      setAlreadySubmitted(true);
       setProfileData(bank.bank_details[0]);
    }
  });
}, [router]);


  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetEdit(true);
    const { name, value } = e.target;
    setProfileData((prev: typeof profileData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEdit) return;
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (!loggedInUser.id) router.replace("/logout");
    if (!validateForm()) {
      return;
    }
    try {
      if (submitProcess) {
        return;
      }
      setSubmitProcess(true);

      const res = await addBankDetails({
        user_id: loggedInUser?.id,
        ...profileData,
      });
      if (res?.success) {
        toast.success("Bank details added successfully!");
        setSubmitProcess(false);
        setAlreadySubmitted(true);
      } else {
        toast.error(res?.details);
        setSubmitProcess(false);
      }
    } catch (error) {
      console.log("Update Error:", error);
      toast.error("Failed to add bank details.");
      setSubmitProcess(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="min-h-screen w-full relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" />

        {/* Page Content */}
        <div className="relative z-10 flex flex-col">
          <div className="flex justify-center items-start pt-36 pb-20 px-4">
            {loading ? (
              <div className="flex justify-center items-center h-[50vh]">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="w-[850px] max-w-[100%] bg-brandBlack rounded-sm p-[30px]">
                <h2 className="md:text-[23px] text-text-lg leading-[36px] font-semibold text-white mb-[27px]">
                  Personal info
                </h2>

                <form className="space-y-[28px]" onSubmit={handleSubmit}>
                  {/* Product Name */}
                  <div className="grid md:grid-cols-2 gap-2 ">
                    <div>
                      <label className=" text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={profileData?.first_name || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                    <div>
                      <label className=" text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={profileData?.last_name || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                  </div>

                  {/* Make */}
                  <div className="grid md:grid-cols-2 gap-2">
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={profileData?.phone || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>

                    {/* Model */}

                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData?.email || ""}
                        readOnly={true}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-2">
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        max={
                          new Date(
                            new Date().setFullYear(
                              new Date().getFullYear() - 14,
                            ),
                          )
                            .toISOString()
                            .split("T")[0]
                        }
                        value={profileData?.dob || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        National ID Number
                      </label>
                      <input
                        type="text"
                        name="id_number"
                        value={profileData?.id_number || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>

                    {/* Model */}
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={profileData?.address || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>

                    {/* Model */}
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={profileData?.city || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-2">
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={profileData?.state || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>

                    {/* Model */}
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postal_code"
                        value={profileData?.postal_code || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                  </div>
                  <h2 className="md:text-[23px] text-text-lg leading-[36px] font-semibold text-white mb-[27px]">
                    Bank Details
                  </h2>
                  <div className="grid md:grid-cols-3 gap-2">
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        name="account_holder_name"
                        value={profileData?.account_holder_name || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>

                    {/* Model */}
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Routing Number
                      </label>
                      <input
                        type="text"
                        name="routing_number"
                        value={profileData?.routing_number || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="account_number"
                        value={profileData?.account_number || ""}
                        onChange={handleProfileChange}
                        className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  {alreadySubmitted ? (
                    <div
                        onClick={() => setOpenDelete(true)}
                      className={`flex justify-center md:text-base text-[15px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold  duration-400 cursor-pointer bg-red-600 hover:bg-red-400 `}
                    >
                      Delete Bank Details
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className={`flex justify-center md:text-base text-[15px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold  duration-400 ${isEdit ? "cursor-pointer bg-autoblue hover:bg-hoverblue " : "cursor-not-allowed bg-gray-500"}  `}
                    >
                      {submitProcess && (
                        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-white rounded-full animate-spin me-2"></div>
                      )}{" "}
                      Submit
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {OpenDelete && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
       onClick={()=> setOpenDelete(false)}
      />

      {/* Delete Box */}
      <div className="relative bg-modalblue text-white w-xl max-w-full p-12 rounded-md shadow-xl border-2 border-borderblue">
        {/* Close Button */}
        <button
      onClick={()=> setOpenDelete(false)}
          className="absolute top-0 right-0 bg-white cursor-pointer h-8 w-8 rounded-full m-2"
        >
          <span className="text-black">✕</span>
        </button>
        <div className="w-xl max-w-full">
          {/* Title */}
          <h2 className="text-center text-2xl leading-8 font-bold mb-12">
            Are you sure You want to delete?
          </h2>

          <div className="flex justify-center gap-8">
            <button
              onClick={() => handleDeletePartRequest()}
              className="bg-autoblue text-md w-full rounded-sm text-white py-4 font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={()=> setOpenDelete(false)}
              className="bg-red-600 text-md w-full rounded-sm text-white py-4 font-semibold hover:bg-red-700 duration-400 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
      )}
    </main>
  );
}
