import KycDetailForm from "@/app/components/supplier/KycDetailForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function KycPage() {
  return (
    <main className="">
      <Header />
      <KycDetailForm />
      {/* <div className="min-h-screen text-white mt-[16rem] justify-center items-center text-center">
       <h1>This is kyc page!</h1>
      </div> */}
      <Footer />
    </main>
  );
}
