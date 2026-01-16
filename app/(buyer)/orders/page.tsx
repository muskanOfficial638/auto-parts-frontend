import Footer from "../../components/Footer";
import Header from "../../components/Header";
import OrdersTable from "@/app/components/dashboard/OrdersTable";

export default function DashboardPage() {
  return (
    <div className="">
      <Header />
      <OrdersTable />
      <Footer />
    </div>
  );
}
