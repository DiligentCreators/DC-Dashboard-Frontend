<template>

  <MainLayout>
<!--    <UsersTable />-->
    <UserTable />
  </MainLayout>
</template>
<script setup lang="ts">
// import UsersTable from "~/components/Common/Table/UsersTable.vue";
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import UserTable from "@/components/User/UserTable.vue"
</script>