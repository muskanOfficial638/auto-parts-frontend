import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
    <Header/>
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-9xl font-extrabold text-gray-800">404</h1>

      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Page Not Found
      </p>

      <p className="mt-2 max-w-md text-gray-500">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
      >
        Go Back Home
      </Link>
    </div>
    <Footer/>
    </>
  );
}
