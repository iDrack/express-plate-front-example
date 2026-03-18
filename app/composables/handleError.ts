import type { FetchError } from "ofetch";

type ApiErrorBody = {
    statusCode: number;
    status: string;
    message: string;
};

export class AppError extends Error {
    statusCode: number;
    status: string;

    constructor(error: FetchError<ApiErrorBody>) {
        super(error.data?.message ?? error.message);
        this.statusCode = error.data?.statusCode ?? error.statusCode ?? 500;
        this.status =
            error.data?.status ??
            error.statusMessage ??
            "Internal Server Error";
    }
}

export const useHandleError = () => {
    return (error: unknown, toast: ReturnType<typeof useToast>) => {
        if (isNuxtError(error)) {
            toast.add({
                title: "An error has occurred.",
                description: `${error.message}`,
                color: "error",
            });
        } else {
            toast.add({
                title: "An error has occurred.",
                description: String(error),
                color: "error",
            });
        }
    };
};
