export default defineNuxtRouteMiddleware((to, from) => {
    const id = to.params.id;
    if (!id) {
        return navigateTo('/profile')
    }
});