"use client";

import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useCreatePasscode } from "@/api/auth/auth.queries";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import CustomButton from "@/components/shared/Button";
import { useQueryClient } from "@tanstack/react-query";

interface SetPasscodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    canClose?: boolean;
}

const SetPasscodeModal: React.FC<SetPasscodeModalProps> = ({ isOpen, onClose, canClose = true }) => {
    const queryClient = useQueryClient();
    const [passcode, setPasscode] = useState("");
    const [confirmPasscode, setConfirmPasscode] = useState("");

    useEffect(() => {
        if (isOpen) {
            setPasscode("");
            setConfirmPasscode("");
        }
    }, [isOpen]);

    const onError = (error: any) => {
        const errorMessage = error?.response?.data?.message;
        const descriptions = Array.isArray(errorMessage)
            ? errorMessage
            : [errorMessage || "Failed to set passcode"];

        ErrorToast({
            title: "Setup Failed",
            descriptions,
        });
    };

    const onSuccess = () => {
        SuccessToast({
            title: "Passcode Set",
            description: "Your login passcode has been set successfully.",
        });
        // Update user data to reflect that passcode is now set
        queryClient.invalidateQueries({ queryKey: ["user"] });
        onClose();
    };

    const { mutate: createPasscode, isPending: setting } = useCreatePasscode(onError, onSuccess);

    if (!isOpen) return null;

    const valid = /^\d{6}$/.test(passcode) && passcode === confirmPasscode;

    const handleSubmit = async () => {
        if (!valid || setting) return;

        createPasscode({
            passcode,
        });
    };

    return (
        <div className="z-[999999] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[100dvh]">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-black/80 dark:bg-black/60" onClick={canClose ? onClose : undefined} />
            </div>
            <div className="relative mx-2.5 2xs:mx-4 bg-bg-600 dark:bg-bg-1100 border border-border-800 dark:border-border-700 px-0 pt-4 pb-5 w-full max-w-md max-h-[92vh] rounded-2xl overflow-hidden">
                {canClose && (
                    <button onClick={onClose} className="absolute top-3 right-3 p-2 cursor-pointer bg-bg-1400 rounded-full hover:bg-bg-1200 transition-colors">
                        <CgClose className="text-xl text-text-200 dark:text-text-400" />
                    </button>
                )}

                <div className="px-5 sm:px-6 pt-1 pb-3 text-center">
                    <h2 className="text-white text-base sm:text-lg font-semibold">Set Login Passcode</h2>
                    <p className="text-white/60 text-sm">Secure your account with a 6-digit passcode</p>
                </div>

                <div className="px-5 sm:px-6 space-y-4">
                    <div>
                        <label className="block text-sm text-white/80 mb-1.5 font-medium text-center">New Passcode</label>
                        <div className="w-full flex items-center bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-4 px-3">
                            <input
                                type="password"
                                inputMode="numeric"
                                maxLength={6}
                                placeholder="Enter 6-digit passcode"
                                className="w-full bg-transparent outline-none border-none text-white text-center placeholder:text-white/30 text-2xl tracking-[0.5em] font-bold"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))}
                                autoFocus
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-white/80 mb-1.5 font-medium text-center">Confirm Passcode</label>
                        <div className="w-full flex items-center bg-bg-2400 dark:bg-bg-2100 border border-border-600 rounded-lg py-4 px-3">
                            <input
                                type="password"
                                inputMode="numeric"
                                maxLength={6}
                                placeholder="Confirm 6-digit passcode"
                                className="w-full bg-transparent outline-none border-none text-white text-center placeholder:text-white/30 text-2xl tracking-[0.5em] font-bold"
                                value={confirmPasscode}
                                onChange={(e) => setConfirmPasscode(e.target.value.replace(/\D/g, ""))}
                            />
                        </div>
                    </div>

                    {passcode.length === 6 && confirmPasscode.length === 6 && passcode !== confirmPasscode && (
                        <p className="text-red-500 text-xs text-center mt-1">Passcodes do not match</p>
                    )}
                </div>

                <div className="px-5 sm:px-6 pt-6">
                    <CustomButton
                        onClick={handleSubmit}
                        disabled={!valid || setting}
                        isLoading={setting}
                        className="w-full rounded-xl py-4 font-semibold bg-[#D4B139] hover:bg-[#c7a42f] text-black text-lg transition-all active:scale-95"
                    >
                        Setup Passcode
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default SetPasscodeModal;
