import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { $api } from "~/composables/api";
import { useCookie } from "#app";
import {useCommonStore} from "~/stores/common.js";

export const useClientStore = defineStore("client", () => {
    const clients = ref([]);
    const isClientLoading = ref(false);
    const selectedClient = ref(null);
    const errors = ref(null);
    const common = useCommonStore();
    const token = useCookie("auth_token");

    // Fetch all clients
    async function fetchClients() {
        isClientLoading.value = true;
        try {
            const data = await $api("/api/admin/users", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            clients.value = data.data;
        } catch (err) {
            toast.error("Error loading clients.");
        } finally {
            isClientLoading.value = false;
        }
    }


    // Create new client
    async function createClient(clientData) {
        errors.value = null;
        try {
            await $api("/api/admin/users", {
                method: "post",
                body: clientData,
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Client created successfully");
            await fetchClients();
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
    async function getClient(id) {
        try {
            const { data, error } = await useApifetch(`/api/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            if (error.value) throw new Error("Failed to get client");
            selectedClient.value = data.value;
        } catch (err) {
            toast.error("Could not fetch client details.");
        }
    }

    // Update a client
    async function updateClient(id, updatedData) {
        common.validationError  = null;
        try {
            await $api(`/api/admin/users/${id}`, {
                method: "put",
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Client updated successfully");
            await fetchClients();
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
    async function updateClientPassword(id, updatedData) {
        common.validationError  = null;
        try {
            await $api(`/api/admin/users/${id}/update-password`, {
                method: "put",
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Client password updated successfully");
            await fetchClients();
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
    async function deleteClient(id) {
        try {
            await $api(`/api/admin/users/${id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Client deleted");
            await fetchClients();
        } catch (err) {
            toast.error("Failed to delete client.");
        }
    }
    async function restoreClient(id) {
        try {
            await $api(`/api/admin/users/${id}/restore`, {
                method: "post",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Client restored");
            await fetchClients();
        } catch (err) {
            toast.error("Failed to restore client.");
        }
    }
    async function forceDeleteClient(id) {
        try {
            await $api(`/api/admin/users/${id}/force-delete`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Client deleted");
            await fetchClients();
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


    async function toggleEmail(id) {
        try {
            await $api(`/api/admin/${id}/toggle-email-verified`, {
                method: "patch",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Successfully toggled email status.");
        } catch (err) {
            toast.error("Failed to toggle email status.");
            throw err;
        }
    }

    return {
        toggleEmail,
        toggleActiveStatus,
        toggleSuspendedStatus,
        clients,
        selectedClient,
        isClientLoading,
        errors,
        fetchClients,
        createClient,
        getClient,
        updateClient,
        deleteClient,
        restoreClient,
        forceDeleteClient,
        updateClientPassword,
    };
});
