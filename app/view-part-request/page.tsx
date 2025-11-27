import ViewPartRequest from "../components/buyer/ViewPartRequest";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ViewPartRequestPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <ViewPartRequest />
      <Footer />
    </main>
  );
}
