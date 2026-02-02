/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@tanstack/react-query";
import { deleteAccountRequest } from "./delete-account.apis";

export const useDeleteAccountRequest = (
    onError: (error: any) => void,
    onSuccess: (data: any) => void
) => {
    return useMutation({
        mutationFn: deleteAccountRequest,
        onError,
        onSuccess,
    });
};
