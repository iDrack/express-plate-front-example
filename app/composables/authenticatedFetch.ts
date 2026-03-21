import { useAuthStore } from "~/stores/auth.store";
import type { FetchError } from "ofetch";

export const useAuthenticatedFetch = () => {
    const store = useAuthStore();

    return async <T>(url: string, options: any = {}) => {
        const makeRequest = () =>
            $fetch<T>(url, {
                ...options,
                headers: {
                    Authorization: `Bearer ${store.authToken}`,
                    ...options.headers,
                },
                credentials: "include",
            });

        try {
            return await makeRequest();
        } catch (error) {
            const fetchError = error as FetchError;
            if (
                fetchError.statusCode === 401 &&
                fetchError.data?.message === "Invalid or expired token."
            ) {
                const refreshed = await store.refreshAuthToken();
                if (refreshed) {
                    return await makeRequest();
                } else {
                    await store.logout();
                    throw createError({
                        statusCode: 401,
                        statusMessage: "Session expired.",
                    });
                }
            }
            throw createError({
                statusCode: fetchError.statusCode || 500,
                statusMessage:
                    fetchError.data?.message ||
                    fetchError.message ||
                    "An error as occurred.",
            });
        }
    };
};
