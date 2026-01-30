"use client";
import GalleryLoader from "@/app/components/common/GalleryLoader";
import Header from "@/app/components/Header";
import {  useState } from "react";

export default function Home() {

 const [galleryOpen, setGalleryOpen] = useState(false);;

  return (
    <>
 <Header />
    <button className="m-[20%]" onClick={() => setGalleryOpen(true)}>Open Gallery</button>
     <GalleryLoader onClose={setGalleryOpen} open={galleryOpen} images={["https://placehold.co/600x400?text=Image+1", "https://placehold.co/600x400?text=Image+2", "https://placehold.co/600x400?text=Image+3"]}  />
 
  </>
  );
   
  
}