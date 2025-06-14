import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { $api } from "~/composables/api";
import { useCookie } from "#app";
import {useCommonStore} from "~/stores/common.js";

export const useRoleStore = defineStore("role", () => {
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


    // Create new role
    async function createRole(roleData) {
        common.validationError = null

        try {
            await $api("/api/admin/roles", {
                method: "post",
                body: roleData,
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
                toast.error("Failed to create role.");
            }
            return false;

        }

    }

    // Get a specific role
    async function getRole(id) {
        try {
            const { data, error } = await useApifetch(`/api/admin/roles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            if (error.value) throw new Error("Failed to get role");
            selectedRole.value = data.value;
        } catch (err) {
            toast.error("Could not fetch role details.");
        }
    }

    // Update a role
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
                toast.error("Failed to update role.");
            }
        }
    }
    // Update a role
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
                toast.error("Failed to update role password.");
            }
        }
    }

    // Delete a role
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
            toast.error("Failed to delete role.");
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
            toast.error("Failed to restore role.");
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
            toast.error("Failed to delete role.");
        }
    }
    // Toggle Active Status
    async function toggleActiveStatus(id) {
        try {
            await $api(`/api/admin/roles/${id}/toggle-active`, {
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


    const allPermissions = ref([])

    const fetchAllPermissions = async () => {
        try {
            const { data } = await $api('/api/admin/permissions', {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            allPermissions.value = data
        } catch (e) {
            toast.error("Failed to fetch permissions");
        }
    }


    return {
        fetchAllPermissions,
        allPermissions,
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
