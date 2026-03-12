import { useAuthStore } from "~/stores/auth.store";

export const useAuthenticatedFetch = () => {
    const store = useAuthStore();

    return async <T>(url: string, options: any = {}) => {
        const makeRequest = () =>
            useFetch<T>(url, {
                ...options,
                headers: {
                    Authorization: `Bearer ${store.authToken}`,
                    ...options.headers,
                },
                credentials: "include",
            });

        let response = await makeRequest();

        if (
            response.error.value?.statusCode === 401 &&
            response.error.value?.message === "Invalid or expired token."
        ) {
            const refreshed = await store.refreshAuthToken();
            if (refreshed) {
                response = await makeRequest();
            } else {
                await store.logout();
                throw createError({
                    statusCode: 401,
                    statusMessage: "Session expired.",
                });
            }
        }

        return response;
    };
};
