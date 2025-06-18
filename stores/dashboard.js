import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { $api } from "~/composables/api";
import { useCookie } from "#app";
import {useCommonStore} from "~/stores/common.js";

export const useDashboardStore = defineStore("dashboard", () => {
    const cards = ref([]);
    const token = useCookie("auth_token");
    const totalUsers = ref({})
    const suspendedUser = ref({})
    const lockedUsers = ref({})
    const Staffs = ref({})
    const Users = ref({})



    // Fetch all Roles
    async function fetchCards() {
        try {
            const data = await $api("/api/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            totalUsers.value = data.data.total_users
            suspendedUser.value = data.data.suspended
            lockedUsers.value = data.data.locked_users
            Staffs.value = data.data.Staffs
            Users.value = data.data.Users
            // cards.value = data.data;


        } catch (err) {
            toast.error("Error loading Dashboard Cards.");
        }
    }




    return {
        fetchCards,
        cards,
        totalUsers,
        lockedUsers,
        Staffs,
        Users,
        suspendedUser

    };
});
