"use client";

import { useState } from "react";
import Header from "../components/Header";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("");

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <Header />

      {/* Login Section */}
      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center bg-black bg-blend-hard-light"
        style={{
          backgroundImage: "url('/login-signup-bg.jpg')",
        }}
      >
        <div
          className={`rounded-xl shadow-lg w-full ${
            isLogin ? "max-w-md" : "max-w-3xl"
          }`}
        >
          <motion.div
            className="flex justify-center mb-8 space-x-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setIsLogin(true)}
              className={`text-3xl font-light border-b-2 pb-1 ${
                isLogin
                  ? "text-[#00A8FF] border-[#00A8FF]"
                  : "text-gray-400 border-transparent"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`text-3xl font-light border-b-2 pb-1 ${
                !isLogin
                  ? "text-[#00A8FF] border-[#00A8FF]"
                  : "text-gray-400 border-transparent"
              }`}
            >
              Sign up
            </button>
          </motion.div>

          {/* Login form */}
          {isLogin && (
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Enter email"
                className="px-4 py-3 rounded-full bg-white text-black focus:outline-none"
              />
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter password"
                  className="px-4 py-3 rounded-full bg-white text-black w-full focus:outline-none"
                />
                <span className="absolute right-4 top-3 text-gray-600 cursor-pointer">
                  <AiFillEye />
                </span>
              </div>

              <div className="text-left text-sm text-[#00A8FF] hover:underline cursor-pointer">
                Forgot Password ?
              </div>

              <button className="mt-2 bg-[#006BCE] py-3 rounded-full font-semibold hover:bg-[#005bb5] transition">
                Login
              </button>
            </form>
          )}

          {/* Sign-up form */}
          {!isLogin && (
            <form className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <input
                type="text"
                placeholder="Name"
                className="col-span-1 bg-white text-gray-800 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Company"
                className="col-span-1 bg-white text-gray-800 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="col-span-1 bg-white text-gray-800 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select role</option>
                <option value="buyer">Buyer</option>
                <option value="supplier">Supplier</option>
              </select>

              <input
                type="text"
                placeholder="VAT Number"
                className="col-span-1 bg-white text-gray-800 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Enter email"
                className="col-span-2 bg-white text-gray-800 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="relative col-span-2">
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full bg-white text-gray-800 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-5 top-3 text-gray-400 cursor-pointer">
                  <AiFillEye />
                </span>
              </div>

              <div className="col-span-2 flex justify-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="accent-blue-600 w-4 h-4"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{" "}
                  <a href="#" className="underline text-white">
                    Terms & Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 mt-4 font-semibold"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
