"use client";
import { useState } from "react";
import { imagePath } from "@/app/utils/api";

export default function GalleryLoader({ onClose, open, images }: { onClose: (open: boolean) => void; open: boolean; images: string[] }) {


  const [selectedImage, setSelectedImage] = useState(images[0]);
  if (!images || images.length === 0) return null;
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50  flex items-center justify-center">

          <div className="relative bg-white rounded-xl p-4 w-[90%] md:w-[700px]">

            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => onClose(false)}
                className="absolute top-2 right-3 text-2xl font-bold"
              >
                ✕
              </button>
              <div className="w-full max-w-3xl">
                <img id="main-image" src={imagePath + selectedImage} className="w-full rounded-lg h-96 object-cover" alt="Main Image" />
              </div>
              <div className="grid grid-cols-5 max-w-3xl gap-4" id="thumbnail-container">
                {(images.map((src, index) => (
                  <img onClick={() => setSelectedImage(src)} key={index} src={imagePath + src} className="w-full thumb rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80" alt={`Thumb ${index + 1}`} />
                )))}

              </div>
            </div>
          </div>

        </div>
      )}
    </>


  );
}
