/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    handleNumericKeyDown,
    handleNumericPaste,
} from "@/utils/utilityFunctions";
import { motion } from "framer-motion";
import CustomButton from "@/components/shared/Button";
import { zoomIn } from "@/utils/motion";
import ErrorToast from "@/components/toast/ErrorToast";
import SuccessToast from "@/components/toast/SuccessToast";
import { useDeleteAccountRequest } from "@/api/delete-account/delete-account.queries";

const deleteAccountSchema = yup.object().shape({
    fullname: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().optional(),
    title: yup.string().required("Title is required"),
    message: yup.string().required("Reason for deletion is required"),
});

type DeleteAccountFormData = yup.InferType<typeof deleteAccountSchema>;

const DeleteAccountForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<DeleteAccountFormData>({
        defaultValues: {
            fullname: "",
            email: "",
            phone: "",
            title: "Delete my Account",
            message: "",
        },
        resolver: yupResolver(deleteAccountSchema),
    });

    const onError = async (error: any) => {
        const errorMessage = error?.response?.data?.message;
        const descriptions = Array.isArray(errorMessage)
            ? errorMessage
            : [errorMessage];

        ErrorToast({
            title: "Error Sending Request",
            descriptions,
        });
    };

    const onSuccess = () => {
        SuccessToast({
            title: "Request Sent!",
            description:
                "Your account deletion request has been received. We will process it within 48 hours.",
        });
        reset();
    };

    const {
        mutate: sendRequest,
        isPending: isPending,
        isError: isError,
    } = useDeleteAccountRequest(onError, onSuccess);

    const isLoading = isPending && !isError;

    const onSubmit = async (data: DeleteAccountFormData) => {
        sendRequest(data as any);
    };

    return (
        <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-1">
                <div className="w-full flex flex-col gap-1.5 ">
                    <div className="flex flex-col gap-1">
                        <input
                            type="text"
                            {...register("fullname")}
                            placeholder="Full Name*"
                            className="outline-none text-base text-black dark:text-white bg-bg-600 dark:bg-bg-1100  placeholder:text-text-400 rounded-md py-4 px-4 border border-transparent focus:border-primary transition-all duration-300"
                        />
                        {errors.fullname?.message && (
                            <p className="text-red-500 text-sm">{errors.fullname.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 ">
                <div className="w-full flex flex-col gap-1.5 ">
                    <div className="flex flex-col gap-1">
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Email Address (Linked to your account)*"
                            className="outline-none text-base text-black dark:text-white bg-bg-600 dark:bg-bg-1100  placeholder:text-text-400 rounded-md py-4 px-4 border border-transparent focus:border-primary transition-all duration-300"
                        />
                        {errors.email?.message && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 ">
                <div className="w-full flex flex-col gap-1.5 ">
                    <div className="flex flex-col gap-1">
                        <input
                            {...register("phone")}
                            placeholder="Phone Number (Optional)"
                            className="outline-none text-base text-black dark:text-white bg-bg-600 dark:bg-bg-1100  placeholder:text-text-400 rounded-md py-4 px-4 border border-transparent focus:border-primary transition-all duration-300"
                            type="text"
                            onKeyDown={handleNumericKeyDown}
                            onPaste={handleNumericPaste}
                        />
                        {errors.phone?.message && (
                            <p className="text-red-500 text-sm">{errors.phone.message}</p>
                        )}
                    </div>
                </div>
            </div>



            <div className="grid grid-cols-1 ">
                <div className="w-full flex flex-col gap-1.5 ">
                    <div className="flex flex-col gap-1">
                        <textarea
                            {...register("message")}
                            placeholder="Reason for deletion*"
                            rows={6}
                            className="resize-y outline-none text-base text-black dark:text-white bg-bg-600 dark:bg-bg-1100  placeholder:text-text-400 rounded-md py-4 px-4 border border-transparent focus:border-primary transition-all duration-300"
                        />
                        {errors.message?.message && (
                            <p className="text-red-500 text-sm">{errors.message.message}</p>
                        )}
                    </div>
                </div>
            </div>

            <motion.div className="mt-4 w-full" variants={zoomIn(0.2, 0.5)}>
                <CustomButton
                    type="submit"
                    disabled={!isValid || isLoading}
                    isLoading={isLoading}
                    className="w-full font-semibold py-3.5 bg-primary text-black text-base 2xs:text-lg max-2xs:px-6 rounded-md hover:bg-secondary transition-colors"
                >
                    Request Account Deletion
                </CustomButton>
            </motion.div>
        </form>
    );
};

export default DeleteAccountForm;
