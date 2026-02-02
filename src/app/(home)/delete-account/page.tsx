import DeleteAccountContent from "@/components/home/deleteAccount/DeleteAccountContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Delete Account | NattyPay",
    description: "Request to permanently delete your NattyPay account.",
};

const DeleteAccountPage = () => {
    return <DeleteAccountContent />;
};

export default DeleteAccountPage;
