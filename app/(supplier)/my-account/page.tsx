import MyAccountForm from "@/app/components/supplier/MyAccountForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function MyAccountPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <MyAccountForm/>
      <Footer />
    </main>
  );
}
