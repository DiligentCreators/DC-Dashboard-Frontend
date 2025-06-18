export default defineNuxtRouteMiddleware(async (to) => {
    const auth = useAuthStore()

    while (auth.isAuthLoading) {
        await new Promise((r) => setTimeout(r, 50))
    }

    if (auth.isLoggedIn) {
        if (auth.user?.data?.is_admin) {
            return navigateTo('/dashboard')
        } else {
            return navigateTo('/user-dashboard')
        }
    }
})
