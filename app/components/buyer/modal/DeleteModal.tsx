/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deletePartRequest} from "@/app/utils/api";
import { toast } from "react-toastify";

export default function DeleteModal({
  open,
  requestId,
  onClose,
  onDeleted
}: {
  open: boolean;
  requestId: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
  if (!open) return null;

  async function handleDeletePartRequest(requestId: string) {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    try {
      const response = await deletePartRequest(
        loggedInUser?.access_token,
        requestId
      );
      if (response) {
        toast.success("Request deleted successfully");
        onDeleted();
        onClose();
      }
    } catch (err: any) {
      // Handle errors more gracefully
      if (err.response.data.detail.status === false) {
        console.error("Server error:", err.response.data.detail);
        toast.error(err.response.data.detail.message|| "Failed to delete request");
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response:", err.request);
        toast.error("No response from server");
      } else {
        // Something else happened
        console.error("Error:", err.message);
        toast.error("Unexpected error occurred");
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Delete Box */}
      <div className="relative bg-modalblue text-white w-xl max-w-full p-12 rounded-md shadow-xl border-2 border-borderblue">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-white cursor-pointer h-8 w-8 rounded-full m-2"
        >
          <span className="text-black">✕</span>
        </button>
        <div className="w-xl max-w-full">
          {/* Title */}
          <h2 className="text-center text-2xl leading-8 font-bold mb-12">
            Are you sure You want to delete this request?
          </h2>

          <div className="flex justify-center gap-8">
            <button
              onClick={() => handleDeletePartRequest(requestId)}
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
      </div>
    </div>
  );
}
