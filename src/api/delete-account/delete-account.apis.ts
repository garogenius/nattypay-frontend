import { request } from "@/utils/axios-utils";
import { IDeleteAccountRequest } from "./delete-account.types";

export const deleteAccountRequest = async (formdata: IDeleteAccountRequest) => {
    return request({
        url: "/contact-us",
        method: "post",
        data: formdata,
    });
};
