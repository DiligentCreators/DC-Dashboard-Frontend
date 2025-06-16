<template>
  <FormLayout>
    <form @submit.prevent="handleResetPassword" class="space-y-4 text-gray-800">
      <h1 class="text-xl ">Reset Password</h1>

      <BaseInput
          label="New Password"
          type="password"
          placeholder="Enter new password"
          v-model="form.password"
      />
      <ValidationError field="password" />

      <BaseInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          v-model="form.password_confirmation"
      />
      <ValidationError field="password_confirmation" />

      <p v-if="common.Invalid" class="text-red-500 h-5">{{ common.Invalid }}</p>

      <PrimaryButton type="submit" :disabled="loading" :loading="loading">
        Reset Password
      </PrimaryButton>
    </form>

    <p class="mt-6 text-sm text-gray-600 dark:text-gray-300">
      <NuxtLink to="/login" class="text-blue-500 hover:underline">Back to login</NuxtLink>
    </p>
  </FormLayout>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCommonStore } from "@/stores/common";
import { ref, reactive } from "vue";

import FormLayout from "~/layouts/Guest/FormLayout.vue";
import BaseInput from "~/components/Common/BaseInput.vue";
import PrimaryButton from "~/components/Common/PrimaryButton.vue";
import ValidationError from "~/components/Common/ValidationError.vue";

const route = useRoute();
const auth = useAuthStore();
const common = useCommonStore();

const loading = ref(false);

// Token from URL (e.g. ?token=abc123)
const token = route.query.token || "";

const form = reactive({
  password: "",
  password_confirmation: "",
  token: token,
});

const handleResetPassword = async () => {
  loading.value = true;

  try {
    await auth.resetPassword(form); // Send form object
    await navigateTo("/login");
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  middleware: ["guest"],
});
</script>
