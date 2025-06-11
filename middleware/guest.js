export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuthStore();

    while (auth.isAuthLoading) {
        await new Promise((r) => setTimeout(r, 50));
    }

    if (auth.isLoggedIn) {
        return navigateTo("/dashboard", { replace: true });
    }
});
