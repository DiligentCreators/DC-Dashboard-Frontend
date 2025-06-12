import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { $api } from "~/composables/api";
import { useCookie } from "#app";
import {useCommonStore} from "~/stores/common.js";

export const useRoleStore = defineStore("client", () => {
    const Roles = ref([]);
    const isRoleLoading = ref(false);
    const selectedRole = ref(null);
    const common = useCommonStore();
    const token = useCookie("auth_token");

    // Fetch all Roles
    async function fetchRoles() {
        isRoleLoading.value = true;
        try {
            const data = await $api("/api/admin/roles", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            Roles.value = data.data;
        } catch (err) {
            toast.error("Error loading Roles.");
        } finally {
            isRoleLoading.value = false;
        }
    }


    // Create new client
    async function createRole(clientData) {
        common.validationError = null

        try {
            await $api("/api/admin/roles", {
                method: "post",
                body: clientData,
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Role created successfully");
            await fetchRoles();
            return true;

        } catch (err) {
            if (err.status === 422) {
                common.validationError = err.data.errors;
                toast.error("Validation failed.");
            } else {
                toast.error("Failed to create client.");
            }
            return false;

        }

    }

    // Get a specific client
    async function getRole(id) {
        try {
            const { data, error } = await useApifetch(`/api/admin/roles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            if (error.value) throw new Error("Failed to get client");
            selectedRole.value = data.value;
        } catch (err) {
            toast.error("Could not fetch client details.");
        }
    }

    // Update a client
    async function updateRole(id, updatedData) {
        common.validationError  = null;
        try {
            await $api(`/api/admin/roles/${id}`, {
                method: "put",
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Role updated successfully");
            await fetchRoles();

        } catch (err) {
            if (err.status === 422) {
                common.validationError = err.data.errors;
                toast.error("Validation failed.");
            } else {
                toast.error("Failed to update client.");
            }
        }
    }
    // Update a client
    async function updateRolePassword(id, updatedData) {
        common.validationError  = null;
        try {
            await $api(`/api/admin/roles/${id}/update-password`, {
                method: "put",
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Role password updated successfully");
            await fetchRoles();
        } catch (err) {
            if (err.status === 422) {
                common.validationError  = err.data.errors;
                toast.error("Validation failed.");
            } else {
                toast.error("Failed to update client password.");
            }
        }
    }

    // Delete a client
    async function deleteRole(id) {
        try {
            await $api(`/api/admin/roles/${id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Role deleted");
            await fetchRoles();
        } catch (err) {
            toast.error("Failed to delete client.");
        }
    }
    async function restoreRole(id) {
        try {
            await $api(`/api/admin/roles/${id}/restore`, {
                method: "post",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Role restored");
            await fetchRoles();
        } catch (err) {
            toast.error("Failed to restore client.");
        }
    }
    async function forceDeleteRole(id) {
        try {
            await $api(`/api/admin/roles/${id}/force-delete`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Role deleted");
            await fetchRoles();
        } catch (err) {
            toast.error("Failed to delete client.");
        }
    }
    // Toggle Active Status
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




    return {
        toggleActiveStatus,
        Roles,
        selectedRole,
        isRoleLoading,
        fetchRoles,
        createRole,
        getRole,
        updateRole,
        deleteRole,
        restoreRole,
        forceDeleteRole,
        updateRolePassword,
    };
});
