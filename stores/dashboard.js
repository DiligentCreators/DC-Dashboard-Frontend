import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { $api } from "~/composables/api";
import { useCookie } from "#app";
import {useCommonStore} from "~/stores/common.js";

export const useDashboardStore = defineStore("dashboard", () => {
    const cards = ref([]);
    const token = useCookie("auth_token");
    const totalUsers = ref(0)
    const suspendedUser = ref(0)
    const lockedUsers = ref(0)
    const Staffs = ref(0)
    const activeUser = ref(0)
    const Users = ref(0)



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
            activeUser.value = data.data.active_users;


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
        suspendedUser,
        activeUser,

    };
});
