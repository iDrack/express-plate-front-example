import type { FetchError } from "ofetch";

export const useHandleError = () => {
    return (error: unknown, toast: ReturnType<typeof useToast>) => {
        if (isNuxtError(error)) {
            toast.add({
                title: "An error has occurred.",
                description: `${error.message}`,
                color: "error",
                icon: "i-lucide-triangle-alert"
            });
        } else {
            toast.add({
                title: "An error has occurred.",
                description: String(error),
                color: "error",
                icon: "i-lucide-triangle-alert"
            });
        }
    };
};
