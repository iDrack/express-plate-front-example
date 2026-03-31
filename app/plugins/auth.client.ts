import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtPlugin(async (nuxtApp) => {
    try {
        const authStore = useAuthStore();
        if (authStore.authToken) {
            const response = await authStore.refreshAuthToken();
            if (response) {
                await authStore.getProfile();
            }
        }
    } catch (error) {
        console.log(error);        
    }
});
