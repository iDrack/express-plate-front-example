import { useAuthStore } from "~/stores/auth.store";
export default defineNuxtRouteMiddleware((to, from) => {    
    if (
        to.path === "/" ||
        to.path === "/register" ||
        to.path.startsWith("/reset-password")
    ) {        
        return;
    } else {
        const authStore = useAuthStore();
        if (!authStore.authToken) {
            const toast = useToast();
            toast.add({
                title: "Please log in.",
                description: "You need an account to view this page.",
                color: "info",
                icon: "i-lucide-info",
            });
            return navigateTo("/register");
        } else {
            //Fetch user Profile and refresh AuthToken if needed (redirecting to '/')
            authStore.getProfile();
        }
    }
});
