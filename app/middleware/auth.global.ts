import { useAuthStore } from "~/stores/auth.store";

/*Global middleware that :
    x If the requested route is the login page or password reset page ==> accept the request
    x Check if authToken is stored in authStore
    x Request the api to verify if the authToken is still valid, if valid : accept the request
    x Refresh the authToken with /user/refresh
    - If the session is invalid : logout the user and redirect the user to the login page
    x If the session is valid : accept the request
*/
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
