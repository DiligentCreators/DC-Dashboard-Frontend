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
    const loginAdminAsUser = ref(null);
    const token = useCookie("auth_token");
    const isImpersonating = ref(false)

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
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
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
            } else if (err.status === 400 || err.status === 401) {
                common.Invalid = err.data.message;
                toast.error(common.Invalid || "Invalid request.");
            }
            else {
                toast.error("An unexpected error occurred. Please try again later.");
            }

            throw err;
        }

    }
    async function updateProfile(payload) {
        const token = useCookie("auth_token"); // Get the token from cookies

        const formData = new FormData();

        // Append all input fields
        if (payload.name) formData.append('name', payload.name);
        if (payload.email) formData.append('email', payload.email);
        if (payload.phone) formData.append('phone', payload.phone);
        if (payload.address) formData.append('address', payload.address);
        if (payload.city) formData.append('city', payload.city);
        if (payload.state) formData.append('state', payload.state);
        if (payload.country) formData.append('country', payload.country);
        if (payload.zipcode) formData.append('zipcode', payload.zipcode);
        if (payload.gender) formData.append('gender', payload.gender);
        if (payload.dob) formData.append('dob', payload.dob);
        if (payload.avatar) formData.append('avatar', payload.avatar);
        formData.append('_method', 'PUT');

        try {
            const response = await $api('/api/admin/profile', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token.value}`, // 👈 Add this
                },
            });

            user.value = response.data?.user ?? user.value;
            toast.success('Profile updated successfully!');
            return response;
        } catch (err) {
            if (err.status === 422) {
                // Handle validation errors
                common.validationError = err.data.errors;
                toast.error("Please review the form and fix the errors.");
            } else {
                // Handle unexpected errors
                toast.error("Registration failed. Please try again later.");
            }
            toast.error('Profile update failed. Please try again.');
            throw error;
        }
    }

    async function updatePassword(updatedData) {
        const token = useCookie("auth_token");

        common.validationError  = null;
        try {
            await $api(`/api/admin/profile/password`, {
                method: "put",
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Auth password updated successfully");
            await fetchUser(token.value);
            return true;
        } catch (err) {
            if (err.status === 422) {
                common.validationError  = err.data.errors;
                toast.error("Validation failed.");
            } else {
                toast.error("Failed to auth password.");
            }
            return false;

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

            const { data, error } = await useApifetch("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (error.value || !data.value) {
                toast.error("Failed to fetch user");
                resetAuthState();
                return;
            }

            user.value = data.value;

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

    const impersonateUser = async (userId) => {
        const token = useCookie("auth_token")?.value;

        try {
            const response = await $api(`/api/admin/impersonate/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await fetchUser(token);
            isImpersonating.value = true

            toast.success('Now impersonating user');
            navigateTo('/dashboard');
        } catch (error) {
            console.error('Failed to impersonate user:', error);
            toast.error('Could not impersonate user.');
        }
        finally {
            isImpersonating.value = false

        }
    };
    const leaveImpersonation = async () => {
        const token = useCookie("auth_token")?.value;

        try {
            const response = await $api(`/api/admin/impersonate/stop`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await fetchUser(token);
            toast.success(response.message || 'Returned to admin');
            navigateTo('/dashboard');
        } catch (error) {
            console.error('Failed to leave impersonation:', error);
            toast.error('Could not return to admin.');
        }
    };



    async function sendPasswordResetEmail(email) {
        common.validationError = null;
        common.Invalid = null;

        try {
            await $api("/api/auth/forgot-password", {
                method: "post",
                body: { email },
            });

            toast.success("Password reset link sent. Please check your inbox or spam folder.");
            return true;
        } catch (err) {
            if (err.status === 422) {
                common.validationError = err.data.errors;
            } else {
                toast.error("Something went wrong. Try again later.");
            }
            return false;
        }
    }
    async function verifyResetCode(payload) {

        common.validationError = null;
        try {
            await $api("/api/reset-password", {
                method: "post",
                body: payload,
            });

            toast.success("Password reset successfully!");
            return navigateTo("/login");
        } catch (err) {
            if (err.status === 422) {
                common.validationError = err.data.errors;
            } else {
                toast.error("Reset failed. Please try again.");
            }
            return false;
        }
    }


    async function resetPassword(data) {
        common.validationError = null;
        try {
            await $api("/api/auth/reset-password", {
                method: "post",
                body: data,
            });
            toast.success("Password has been reset successfully.");
        } catch (err) {
            if (err.status === 422) {
                common.validationError = err.data.errors;
                toast.error("Please correct the errors.");
            } else {
                toast.error("Failed to reset password.");
            }
            throw err;
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
        leaveImpersonation,
        resetPassword,
        verifyResetCode,
        sendPasswordResetEmail,
        impersonateUser,
        user,
        isLoggedIn,
        loginAdminAsUser,
        isAdmin,
        isAuthLoading,
        attemptRegister,
        attemptLogin,
        fetchUser,
        logout,
        resetAuthState,
        updateProfile,
        updatePassword,
        isImpersonating,
    };
});
