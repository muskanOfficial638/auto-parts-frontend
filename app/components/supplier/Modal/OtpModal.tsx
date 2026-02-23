import { sendOTP, verifyOTP } from "@/app/utils/api";
import { useRouter } from "next/navigation";

import { useRef, useState } from "react";
import { toast } from "react-toastify";

const OTP_LENGTH = 4;

export default function OTPModal({ quoteId,
  open,
  onClose,
}: {
  quoteId: string;
  open: boolean;
  onClose: () => void;
}) {

  console.log("Quote ID in OTP Modal:", quoteId);
  const [confirmDialogBox, setConfirmDialogBox] = useState<boolean>(false);
  const [otpEntered, setOtpEntered] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );
  const router = useRouter();
  const autoPartsUserData = localStorage.getItem("autoPartsUserData");
  const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (!loggedInUser.id) router.replace("/logout");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  async function handleOTPsend() {
    const response = await sendOTP(
   
      {
        user_id: loggedInUser?.user?.id,
      }
    );
    if (response.data.status === true) {
      
      toast.success("OTP sent successfully!");
    }

  }
  const handleChange = (value: string, index: number): void => {
    setOtpEntered(false);
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
      setOtpEntered(false);
    }

    if (value && index === OTP_LENGTH - 1) {
      
      setOtpEntered(true);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const otpValue = otp.join("");
        const response = await verifyOTP(
      {
        user_id: loggedInUser?.user?.id,
        quote_id: quoteId,
        otp: otpValue,
      }
    );
    if (response.data.status === true) {
      toast.success("Your Order has been completed successfully!");
      onClose();
    } else {
      toast.error(response.data.message || "OTP verification failed!");
    }
    
  };

  if (!open) return null;



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* OTP Box */}
      <div className="relative bg-brandBlack text-white w-[700px] max-w-[100%] py-[62px] rounded-[20px] ms-[auto] me-[auto] py-[92px] px-[30px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[10px]  right-[10px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
        >
          <span className="text-black">✕</span>
        </button>

        {confirmDialogBox ? (
          <div className="w-[429px] max-w-[100%] ms-[auto] me-[auto]">
            {/* Title */}
            <h2 className="text-center text-4xl leading-[44px] font-bold mb-[22px]">
              Enter OTP
            </h2>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-[16px] mb-[22px]">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  value={digit}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-[90px] h-[90px] bg-white text-grayMedium text-center text-[39px] font-bold rounded-sm focus:outline-none"
                />
              ))}
            </div>

            {/* Submit */}
            <button onClick={handleSubmit}  className={`${otpEntered ? "bg-autoblue focus:cursor-pointer text-[22px] leading-[14px] w-full rounded-sm text-white py-[20px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer" : "bg-gray-500 text-[22px] leading-[14px] w-full rounded-sm text-white py-[20px] font-semibold cursor-not-allowed"}`}>
              Submit
            </button>
            <p className="text-center mt-4">
              {`Didn't receive OTP code? `}
              <button className="ml-2 text-autoblue font-semibold hover:text-hoverblue cursor-pointer" onClick={handleOTPsend}>
                Resend Code
              </button>
            </p>
          </div>
        ) : (
          <>


            <div className="max-w-full">
              {/* Title */}
              <h2 className="text-center text-2xl leading-8 font-bold mb-12">
                Are you sure You want to Complete this request?
              </h2>

              <div className="flex justify-center gap-8">
                <button
                  onClick={() => { setConfirmDialogBox(true); handleOTPsend(); }}
                  className="bg-autoblue text-md w-full rounded-sm text-white py-4 font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={onClose}
                  className="bg-red-600 text-md w-full rounded-sm text-white py-4 font-semibold hover:bg-red-700 duration-400 cursor-pointer"
                >
                  No
                </button>
              </div>
            </div>


          </>)}
      </div>
    </div >
  );
}
