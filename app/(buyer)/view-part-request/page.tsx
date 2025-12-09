import ViewPartRequest from "../../components/buyer/ViewPartRequest"; 
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Suspense } from "react";

export default function ViewPartRequestPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <ViewPartRequest />
      </Suspense>
      <Footer />
    </main>
  );
}
