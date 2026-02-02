"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import images from "../../../public/images";
import useNavigate from "@/hooks/useNavigate";
import icons from "../../../public/icons";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-text-400 w-full flex flex-col justify-center">
      <motion.div className=" w-[90%] mx-auto py-8 xl:py-10">
        <div className="w-full flex max-xs:justify-center">
          {" "}
          <Image
            onClick={() => navigate("/")}
            src={images.logo}
            alt="logo"
            className="w-44 lg:w-48 h-auto "
          />{" "}
        </div>

        <div className="flex max-xl:flex-col items-start gap-8 xs:gap-12 sm:gap-16 xl:gap-12 2xl:gap-20">
          <div className="relative w-full xl:w-[40%] flex flex-col items-start ">
            <p className="max-xs:text-center text-sm 2xs:text-base leading-5 2xs:leading-6 xs:leading-7">
              NattyPay is more than just a financial service provider; we are a
              community dedicated to improving financial well-being. Join
              thousands of satisfied users who trust NattyPay for their
              financial needs. Download the NattyPay app today and experience
              the future of finance in Nigeria.
            </p>
            <div
              className="absolute -top-40 left-[25rem] -inset-32 opacity-60 dark:opacity-40"
              style={{
                background: `
                radial-gradient(
                  circle at center,
                  rgba(212, 177, 57, 0.4) 0%,
                  rgba(212, 177, 57, 0.2) 40%,
                  rgba(212, 177, 57, 0.1) 60%,
                  rgba(212, 177, 57, 0) 80%
                )
              `,
                filter: "blur(60px)",
                transform: "scale(1.1)",
              }}
            />
          </div>
          <div className="z-10 w-full xl:w-[60%] max-sm:gap-y-8 max-md:gap-y-10 grid grid-cols-2 md:grid-cols-3 justify-between text-sm 2xs:text-base">
            <div className="flex flex-col">
              <h3 className="text-primary text-base xs:text-lg font-semibold mb-2 xs:mb-3">
                Company
              </h3>
              <div className="flex flex-col gap-1.5 xs:gap-2 ">
                <Link
                  href="/about"
                  className="transition-all duration-300 cursor-pointer hover:pl-2"
                >
                  About Us
                </Link>
                <Link
                  href="/coming-soon"
                  className="transition-all duration-300 cursor-pointer hover:pl-2"
                >
                  Join Our Team
                </Link>
                <Link
                  href="/coming-soon"
                  className="transition-all duration-300 cursor-pointer hover:pl-2"
                >
                  Blog
                </Link>
                <Link
                  href="/contact-us"
                  className="transition-all duration-300 cursor-pointer hover:pl-2"
                >
                  Contact Us
                </Link>
                <Link
                  href="/delete-account"
                  className="transition-all duration-300 cursor-pointer hover:pl-2"
                >
                  Delete my Account
                </Link>
              </div>
            </div>

            <div className="flex flex-col max-md:ml-6">
              <h3 className="text-primary text-base xs:text-lg font-semibold mb-2 xs:mb-3">
                Resources
              </h3>
              <div className="flex flex-col gap-1.5 xs:gap-2 ">
                <Link
                  href="/termsOfUse"
                  className="transition-all duration-300 cursor-pointer hover:pl-2"
                >
                  Terms of Use{" "}
                </Link>
                <Link
                  href="/terms&condition"
                  className="transition-all duration-300 cursor-pointer hover:pl-2"
                >
                  Terms & Condition{" "}
                </Link>
                <Link
                  href="/privacyPolicy"
                  className="transition-all duration-300 cursor-pointer hover:pl-2"
                >
                  Privacy Policy{" "}
                </Link>
                <Link
                  href="/refundPolicy"
                  className="transition-all duration-300 cursor-pointer hover:pl-2"
                >
                  Refund Policy{" "}
                </Link>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-primary text-base xs:text-lg font-semibold mb-2 xs:mb-3">
                Info
              </h3>
              <div className="flex flex-col gap-1.5 xs:gap-2 ">
                <a className="">
                  Head office: C3 & C4 Suite second floor Ejiobi plaza new
                  market road Main market onitsha Anambra state
                </a>

                <p
                  onClick={() => {
                    window.open("https://wa.me/2348134146906", "_blank");
                  }}
                  className="cursor-pointer"
                >
                  +2348134146906
                </p>
                <p
                  onClick={() => {
                    window.open("mailto:support@nattypay.com", "_blank");
                  }}
                  className="cursor-pointer"
                >
                  support@nattypay.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="sm:border-t border-border-100  w-full flex justify-center">
        <div className="w-[90%] flex flex-col md:flex-row justify-between items-center gap-2.5 py-6 sm:py-5">
          <p className="text-sm xs:text-base ">
            © {new Date().getFullYear()} NattyPay All rights reserved
          </p>
          <div className="flex space-x-4 sm:space-x-6 mt-2.5 xs:mt-4 md:mt-0">
            <a
              href="https://www.facebook.com/profile.php?id=100084829514458"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image src={icons.socialIcons.facebookIcon} alt="facebook" />
            </a>
            <a
              href="https://www.instagram.com/nattypays?igsh=MWYxdW9iY2M1bzVmbg=="
              target="_blank"
              rel="noopener noreferrer"
              className=" "
            >
              <Image src={icons.socialIcons.instagramIcon} alt="instagram" />
            </a>
            <a
              href="https://www.tiktok.com/@nattypayglobal?_t=ZM-8tjAVR0cYQ1&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className=" "
            >
              <Image src={icons.socialIcons.tiktokIcon} alt="tiktok" />
            </a>
            <a
              href="https://youtube.com/@nattypayglobal?si=9LyF8iMK1pwnGX8P"
              target="_blank"
              rel="noopener noreferrer"
              className=" "
            >
              <Image src={icons.socialIcons.youtubeIcon} alt="youtube" />
            </a>

            <a
              href="https://www.snapchat.com/add/nattypayglobal"
              target="_blank"
              rel="noopener noreferrer"
              className=" "
            >
              <Image src={icons.socialIcons.snapchatIcon} alt="snapchat" />
            </a>

            <a
              href="https://twitter.com/Nattypays"
              target="_blank"
              rel="noopener noreferrer"
              className=" "
            >
              <Image src={icons.socialIcons.twitterIcon} alt="twitter" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
