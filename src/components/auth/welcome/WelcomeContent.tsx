"use client";

import Image from "next/image";
import Link from "next/link";
import CustomButton from "@/components/shared/Button";
import useNavigate from "@/hooks/useNavigate";
import images from "../../../../public/images";
import { useTheme } from "@/store/theme.store";

const WelcomeContent = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleCreateAccount = () => {
    navigate("/account-type");
  };

  return (
    <div className="relative flex h-full min-h-screen w-full overflow-hidden">
      {/* Left Panel - Yellow/Gold Background */}
      <div className="hidden lg:flex lg:w-[40%] bg-[#D4B139] relative items-center justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center px-8 py-12">
          {/* Illustration - Welcome illustration */}
          <div className="w-full max-w-md mb-8 flex items-center justify-center">
            <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-48 h-48 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome</h1>
          <p className="text-lg text-white/90 text-center max-w-md">
            Join thousands of users enjoying seamless banking and financial services with NattyPay.
          </p>
        </div>
      </div>

      {/* Right Panel - Theme-aware Background */}
      <div
        className={`w-full lg:w-[60%] ${
          theme === "dark" ? "bg-[#141414]" : "bg-white"
        } flex flex-col items-center justify-center px-6 sm:px-8 py-12 overflow-x-hidden`}
      >
        <div className="w-full max-w-md space-y-8 overflow-x-hidden">
          {/* Logo - NattyPay Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src={images.singleLogo}
              alt="NattyPay Logo"
              width={120}
              height={60}
              className="w-24 sm:w-28 md:w-32 h-auto object-contain"
              priority
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center space-y-2">
            <h2
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome to NattyPay
            </h2>
            <p className={theme === "dark" ? "text-white/80" : "text-gray-600"}>
              We Are Future Banking
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <CustomButton
              type="button"
              onClick={handleCreateAccount}
              className="w-full bg-[#D4B139] hover:bg-[#c7a42f] text-black font-medium py-3.5 rounded-lg text-base"
            >
              Create New Account
            </CustomButton>
            <CustomButton
              type="button"
              onClick={() => navigate("/login")}
              className={`w-full border-2 border-[#D4B139] font-medium py-3.5 rounded-lg text-base ${
                theme === "dark"
                  ? "bg-transparent text-[#D4B139] hover:bg-[#D4B139]/10"
                  : "bg-transparent text-[#D4B139] hover:bg-[#D4B139]/5"
              }`}
            >
              I have an account
            </CustomButton>
          </div>

          {/* Footer */}
          <div
            className={`text-center text-[9px] xs:text-xs mt-8 px-2 ${
              theme === "dark" ? "text-white/60" : "text-gray-500"
            }`}
          >
            <p className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 flex-nowrap whitespace-nowrap">
              <span>Licenced by CBN</span>
              <Image
                src={images.cbnLogo}
                alt="CBN Logo"
                width={40}
                height={20}
                className="h-3 xs:h-4 sm:h-5 w-auto object-contain"
              />
              <span>Deposits Insured by</span>
              <span className="text-blue-600 underline">NDIC</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeContent;






