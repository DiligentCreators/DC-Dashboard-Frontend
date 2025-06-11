export default defineNuxtPlugin(async () => {
    const auth = useAuthStore();
    const token = useCookie("auth_token");

    if (token.value && !auth.user) {
        await auth.fetchUser(token.value);
    } else {
        auth.isAuthLoading = false;
    }
});
