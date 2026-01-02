import { Suspense } from "react";
import RequestPartForm from "../../components/buyer/RequestPartForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function RequestPartPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <RequestPartForm />
      </Suspense>
      <Footer />
    </main>
  );
}
