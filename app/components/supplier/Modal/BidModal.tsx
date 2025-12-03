export default function BidModal({
  open,
  onClose,
  openOTP,
}: {
  open: boolean;
  onClose: () => void;
  openOTP: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />
      <div className="relative bg-[#0A1A2F] text-white w-[700px] max-w-[100%] bg-[#1d4aa4]/15 backdrop-blur-xl px-10 py-[62px] rounded-[20px] ms-[auto] me-[auto] p-8 shadow-xl border border-white/10 backdrop-blur">
        <button onClick={onClose} className="absolute top-[10px] right-[10px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full">
          <span className=" text-black ">✕</span>
        </button>

        <h2 className="text-center text-white text-3xl font-semibold mb-[58px]">Bid Info</h2>

        <input
          type="number"
          placeholder="Price"
          className="px-[25px] mb-[43px] py-[15px] bg-white text-[19px] leading-[23px] rounded-sm placeholder-[#848484] text-[#848484] focus:outline-none w-full"
        />

        <input
          type="text"
          placeholder="Estimate Days"
          className="px-[25px] py-[15px] mb-[43px] bg-white text-[19px] leading-[23px] rounded-sm placeholder-[#848484] text-[#848484] focus:outline-none w-full"
        />

        <textarea
          placeholder="Description"
          className="px-[25px] py-[15px] bg-white mb-[43px] h-[163px] text-[19px] leading-[23px] rounded-sm placeholder-[#848484] text-[#848484] focus:outline-none w-full"
        />

        <button
          className="bg-[#1DA1F2] text-[22px] leading[14px] w-full rounded-sm text-white py-[20px] font-semibold hover:bg-[#1a8cd8] duration-400 cursor-pointer"
          onClick={() => {
            onClose();
            openOTP();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
