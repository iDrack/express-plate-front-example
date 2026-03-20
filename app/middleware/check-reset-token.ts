export default defineNuxtRouteMiddleware((to, from) => {
    const token = to.query.token as string | undefined;
    if (token === undefined || token.length <= 0) {
        return navigateTo("/register");
    }
});
