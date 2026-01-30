"use client";
import { useEffect, useState } from "react";
import { imagePath } from "@/app/utils/api";
import Image from "next/image";

export default function GalleryLoader({ onClose, open, images }: { onClose: (open: boolean) => void; open: boolean; images: string[] }) {
 const [selectedImage, setSelectedImage] = useState(images[0]);
useEffect(() => {
setSelectedImage(images[0]);
}, [images]);
 
  if (!images || images.length === 0) return null;
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50  flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95"></div>
          <div className="relative bg-[#12151b] rounded-xl p-4 w-[90%] md:w-[700px]">

            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={() => onClose(false)}
                className="absolute top-[10px] right-[10px] bg-hoverblue cursor-pointer h-[40px] w-[40px] rounded-full font-bold"
              >
                ✕
              </button>
              <div className="w-full max-w-3xl">
                <Image width={500} height={500} id="main-image" src={imagePath + selectedImage} className="w-full bg-white rounded-lg h-96 object-contain" alt="Main Image" />
              </div>
              <div className="grid grid-cols-5 max-w-3xl gap-4" id="thumbnail-container">
                {(images.map((src, index) => (
                  <Image width={120} height={120} onClick={() => setSelectedImage(src)} key={index} src={imagePath + src} className="w-full bg-white shadow-[0px_1px_10px_#e9e9e973] thumb rounded-lg md:h-24 h-14 object-contain cursor-pointer hover:opacity-80" alt={`Thumb ${index + 1}`} />
                )))}

              </div>
            </div>
          </div>

        </div>
      )}
    </>


  );
}
