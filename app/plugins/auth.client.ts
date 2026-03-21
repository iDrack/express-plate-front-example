import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtPlugin(async (nuxtApp) => {
    try {
        const authStore = useAuthStore();
        const response = await authStore.refreshAuthToken();
        if (response) {
            console.log("getting profile");
            
            await authStore.getProfile();
        }
    } catch (error) {
        console.log(error);
    }
});
