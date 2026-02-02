"use client";

import { motion } from "framer-motion";
import { textVariant, fadeIn } from "@/utils/motion";
import DeleteAccountForm from "./DeleteAccountForm";
import Image from "next/image";
import icons from "../../../../public/icons";
import images from "../../../../public/images";

const DeleteAccountContent = () => {
    return (
        <div className="w-full relative z-0 bg-bg-400 dark:bg-black overflow-hidden flex flex-col min-h-screen">
            <div className="relative w-full flex flex-col items-center justify-center pt-32 pb-20 sm:pt-40 sm:pb-28">
                {/* Background Accents */}
                <div
                    className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at center, #D4B139 0%, transparent 70%)`,
                        filter: "blur(100px)",
                    }}
                />
                <div
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at center, #D4B139 0%, transparent 70%)`,
                        filter: "blur(80px)",
                    }}
                />

                <div className="w-[90%] lg:w-[85%] 2xl:w-[75%] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start z-10">
                    {/* Left Side: Info */}
                    <motion.div
                        variants={fadeIn("right", "tween", 0.2, 1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <div>
                            <h1 className="text-text-1200 dark:text-text-900 text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
                                Account Deletion <br />
                                <span className="text-primary">(NattyPay)</span>
                            </h1>
                            <div className="w-20 h-1.5 bg-primary mt-4 rounded-full" />
                        </div>

                        <p className="text-text-200 dark:text-text-400 text-base md:text-lg leading-relaxed">
                            You may request to permanently delete your NattyPay account at any
                            time. Once your deletion request is processed, you will no longer
                            be able to log in, and all non-essential personal data associated
                            with your account will be permanently removed from our systems.
                        </p>

                        <div className="flex flex-col gap-6 mt-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-primary font-semibold text-lg">Social Handles</h3>
                                <div className="flex items-center gap-4">
                                    <a href="https://www.facebook.com/profile.php?id=100084829514458" target="_blank" rel="noreferrer" className="p-2 bg-bg-1100 rounded-full hover:bg-primary transition-colors group">
                                        <Image src={icons.socialIcons.facebookIcon} alt="facebook" className="w-5 h-5 group-hover:invert" />
                                    </a>
                                    <a href="https://www.instagram.com/nattypays?igsh=MWYxdW9iY2M1bzVmbg==" target="_blank" rel="noreferrer" className="p-2 bg-bg-1100 rounded-full hover:bg-primary transition-colors group">
                                        <Image src={icons.socialIcons.instagramIcon} alt="instagram" className="w-5 h-5 group-hover:invert" />
                                    </a>
                                    <a href="https://www.tiktok.com/@nattypayglobal?_t=ZM-8tjAVR0cYQ1&_r=1" target="_blank" rel="noreferrer" className="p-2 bg-bg-1100 rounded-full hover:bg-primary transition-colors group">
                                        <Image src={icons.socialIcons.tiktokIcon} alt="tiktok" className="w-5 h-5 group-hover:invert" />
                                    </a>
                                    <a href="https://twitter.com/Nattypays" target="_blank" rel="noreferrer" className="p-2 bg-bg-1100 rounded-full hover:bg-primary transition-colors group">
                                        <Image src={icons.socialIcons.twitterIcon} alt="twitter" className="w-5 h-5 group-hover:invert" />
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-text-200 dark:text-text-400">
                                    <span className="p-2 bg-bg-1100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </span>
                                    <a href="tel:+2348134146906" className="hover:text-primary transition-colors">+2348134146906</a>
                                </div>
                                <div className="flex items-center gap-3 text-text-200 dark:text-text-400">
                                    <span className="p-2 bg-bg-1100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                        >
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </span>
                                    <a href="mailto:support@nattypay.com" className="hover:text-primary transition-colors">support@nattypay.com</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        variants={fadeIn("left", "tween", 0.4, 1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="bg-white/5 dark:bg-bg-1100/50 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Image src={images.logo} alt="logo" className="w-24 grayscale" />
                        </div>
                        <DeleteAccountForm />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountContent;
