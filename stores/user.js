import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { $api } from "~/composables/api";
import { useCookie } from "#app";
import {useCommonStore} from "~/stores/common.js";

export const useUserStore = defineStore("user", () => {
    const users = ref([]);
    const isUserLoading = ref(false);
    const selectedUser = ref(null);
    const common = useCommonStore();

    const token = useCookie("auth_token");

    // Fetch all users
    async function fetchUsers() {
        isUserLoading.value = true;
        try {
            const data = await $api("/api/admin/staff", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            users.value = data.data;
        } catch (err) {
            toast.error("Error loading users.");
        } finally {
            isUserLoading.value = false;
        }
    }



    // Create new user
    async function createUser(clientData) {
        common.validationError = null;
        try {
            await $api("/api/admin/staff", {
                method: "post",
                body: clientData,
                headers: { Authorization: `Bearer ${token.value}` },
            });
            toast.success("User created successfully");
            await fetchUsers();
            return true;
        } catch (err) {
            if (err.status === 422) {
                common.validationError = err.data.errors;
                toast.error("Validation failed.");
            } else {
                toast.error("Failed to create client.");
            }
            return true;

        }
    }

    // Get a specific client
    async function getUser(id) {
        try {
            const { data, error } = await useApifetch(`/api/admin/staff/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            if (error.value) throw new Error("Failed to get client");
            selectedUser.value = data.value;
        } catch (err) {
            toast.error("Could not fetch client details.");
        }
    }

    // Update a client
    async function updateUser(id, updatedData) {
        common.validationError = null;
        try {
            await $api(`/api/admin/staff/${id}`, {
                method: "put",
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("User updated successfully");
            await fetchUsers();
        } catch (err) {
            if (err.status === 422) {
                common.validationError = err.data.errors;
                toast.error("Validation failed.");
            } else {
                toast.error("Failed to update client.");
            }
        }
    }

    // Delete a client
    async function deleteUser(id) {
        try {
            await $api(`/api/admin/staff/${id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("User deleted");
            await fetchUsers();
        } catch (err) {
            toast.error("Failed to delete client.");
        }
    }
    async function restoreUser(id) {
        try {
            await $api(`/api/admin/staff/${id}/restore`, {
                method: "post",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("User restored");
            await fetchUsers();
        } catch (err) {
            toast.error("Failed to restore client.");
        }
    }
    async function forceDeleteUser(id) {
        try {
            await $api(`/api/admin/staff/${id}/force-delete`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("User deleted");
            await fetchUsers();
        } catch (err) {
            toast.error("Failed to delete client.");
        }
    }
    async function toggleActiveStatus(id) {
        try {
            await $api(`/api/admin/${id}/toggle-active`, {
                method: "patch",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Successfully toggled active status.");
        } catch (err) {
            toast.error("Failed to toggle active status.");
            throw err;
        }
    }

    async function toggleSuspendedStatus(id) {
        try {
            await $api(`/api/admin/${id}/toggle-suspended`, {
                method: "patch",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Successfully toggled suspended status.");
        } catch (err) {
            toast.error("Failed to toggle suspended status.");
            throw err;
        }
    }



    return {
        toggleActiveStatus,
        toggleSuspendedStatus,
        users,
        selectedUser,
        isUserLoading,
        fetchUsers,
        createUser,
        getUser,
        updateUser,
        deleteUser,
        restoreUser,
        forceDeleteUser,
    };
});
