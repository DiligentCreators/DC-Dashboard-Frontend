import { defineStore } from "pinia";
import { $api } from "~/composables/api";
import { useCommonStore } from "@/stores/common.js";
import { ref, computed } from "vue";
import { toast } from "vue3-toastify";
import { useCookie } from "#app";
export const useAuthStore = defineStore("auth", () => {
    const isAuthLoading = ref(true);
    const common = useCommonStore();
    const user = ref(null);
    const isAdmin = ref(false);

    const isLoggedIn = computed(() => !!user.value);

    async function attemptRegister(data) {
        try {
            // Clear previous errors
            common.validationError = null;

            // Ensure CSRF token is set
            await $api(`/sanctum/csrf-cookie`);

            // Attempt registration
            await $api(`/api/auth/register`, {
                method: "post",
                body: data,
            });
            toast.success("Registration completed successfully!");
            return true;
        } catch (err) {
            if (err.status === 422) {
                // Handle validation errors
                common.validationError = err.data.errors;
                toast.error("Please review the form and fix the errors.");
            } else {
                // Handle unexpected errors
                toast.error("Registration failed. Please try again later.");
            }

            return false;
        }
    }


    async function attemptLogin(data) {
        try {
            common.validationError = null;
            common.Invalid = null;

            await $api(`/sanctum/csrf-cookie`);
            const response = await $api(`/api/auth/login`, {
                body: data,
                method: "post",
            });

            if (response.data?.access_token) {
                // Set cookie with secure: false for localhost (adjust for production)
                const tokenCookie = useCookie("auth_token", {
                    maxAge: 60 * 60 * 24,
                    sameSite: "lax",
                    secure: false,
                });

                tokenCookie.value = response.data.access_token;

                // Pass token explicitly to fetchUser
                await fetchUser(response.data.access_token);
                return navigateTo("/dashboard", { replace: true });

            }
        }catch (err) {
            if (err.status === 422) {
                common.validationError = err.data.errors;
                toast.error("Please correct the highlighted fields.");
            } else if (err.status === 400) {
                common.Invalid = err.data.message;
                toast.error(err.data.message || "Invalid request.");
            } else {
                toast.error("An unexpected error occurred. Please try again later.");
            }

            throw err;
        }

    }

    // fetchUser expects a token string
    async function fetchUser(token) {
        if (!token) {
            resetAuthState();
            return;
        }
        try {
            isAuthLoading.value = true;
            // Use passed token, NOT cookie value here
            console.log("Auth token passed:", token);
            const { data, error } = await useApifetch("/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (error.value || !data.value) {
                toast.error("Failed to fetch user");
                resetAuthState();
                return;
            }

            user.value = data.value;
            isAdmin.value = !!data.value.is_admin;
        } catch (err) {
            console.error("Exception in fetchUser:", err);
            resetAuthState();
        } finally {
            isAuthLoading.value = false;
        }
    }

    async function logout() {
        try {
            const token = useCookie("auth_token").value;
            if (token) {
                await $api("/api/logout", {
                    method: "post",
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            // Clear auth token cookie manually if useCookie() doesn't do it automatically
            useCookie("auth_token").value = null;
            localStorage.clear(); // If you store auth info here
            resetAuthState();
            window.location.href = "/login";
        }
    }

    function resetAuthState() {
        user.value = null;
        isAdmin.value = false;
        useCookie("auth_token").value = null;
        common.validationError = null;
        common.Invalid = null;

    }

    return {
        user,
        isLoggedIn,
        isAdmin,
        isAuthLoading,
        attemptRegister,
        attemptLogin,
        fetchUser,
        logout,
        resetAuthState,
    };
});
