export default function OTPModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* OTP Box */}
      <div className="relative bg-[#061D37] text-white w-[700px] max-w-[100%] py-[62px] rounded-[20px] ms-[auto] me-[auto] py-[92px] px-[30px]  shadow-xl border-2 border-[#426A84]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[10px]  right-[10px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
        >
          <span className="text-black">✕</span>
        </button>
        <div className="w-[429px] max-w-[100%] ms-[auto] me-[auto]">
          {/* Title */}
          <h2 className="text-center text-4xl leading-[44px] font-bold mb-[22px]">
            Enter OTP
          </h2>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-[16px] mb-[22px]">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                maxLength={1}
                type="text"
                className="w-[90px] h-[90px] bg-white text-[#848484] text-center text-[39px] font-bold rounded-sm  focus:outline-none"
              />
            ))}
          </div>

          {/* Submit */}
          <button className="bg-[#1DA1F2] text-[22px] leading[14px] w-full rounded-sm text-white py-[20px] font-semibold hover:bg-[#1a8cd8] duration-400 cursor-pointer">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
