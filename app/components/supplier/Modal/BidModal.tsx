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
      <div className="relative bg-[#0A1A2F] text-white w-[500px] p-8 rounded-xl shadow-xl border border-white/10 backdrop-blur">
        <button onClick={onClose} className="absolute top-4 right-4">
          <span className="bg-white rounded-full p-2 text-black cursor-pointer">✕</span>
        </button>

        <h2 className="text-center text-2xl font-bold mb-6">Bid Info</h2>

        <input
          type="number"
          placeholder="Price"
          className="w-full bg-white/90 text-gray-700 p-3 rounded-md mb-4"
        />

        <input
          type="date"
          className="w-full bg-white/90 text-gray-700 p-3 rounded-md mb-4"
        />

        <textarea
          placeholder="Description"
          className="w-full bg-white/90 text-gray-700 p-3 rounded-md h-28 mb-6"
        />

        <button
          className="w-full bg-autoblue py-3 rounded-lg text-lg hover:bg-hoverblue cursor-pointer"
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
