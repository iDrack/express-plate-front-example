import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async (to) => {
    if (
        to.path === "/" ||
        to.path === "/register" ||
        to.path.startsWith("/reset-password")
    ) {
        return;
    }

    const authStore = useAuthStore();

    if (authStore.profile) {
        return;
    }

    try {
        if (!authStore.authToken) {
            const refreshed = await authStore.refreshAuthToken();
            if (!refreshed) {
                throw createError({
                    statusCode: 401,
                    statusMessage: "Unauthenticated",
                });
            }
        }

        await authStore.getProfile();
    } catch {
        const toast = useToast();
        toast.add({
            title: "Please log in.",
            description: "You need an account to view this page.",
            color: "info",
            icon: "i-lucide-info",
        });

        return navigateTo("/register");
    }
});
