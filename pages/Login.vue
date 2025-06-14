<template>
  <FormLayout>
    <form @submit.prevent="handleLogin('custom')" class="space-y-4">
      <div>
        <BaseInput
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            class="text-gray-500"
            v-model="form.email"
        />
        <ValidationError field="email" />
      </div>

      <div>
        <BaseInput
            label="Password"
            type="password"
            placeholder="*******"
            class="text-gray-500"
            v-model="form.password"
        />
        <ValidationError field="password" />
      </div>

      <p v-if="common.Invalid" class="text-red-500 h-5">{{ common.Invalid }}</p>

      <div class="text-sm">
        <a href="#" class="text-blue-500 hover:underline">Forgot password?</a>
      </div>

      <div class="space-y-5 space-x-5">
        <PrimaryButton type="button" :disabled="loading" :loading="loading" @click="handleLogin('user')">
          Login as User
        </PrimaryButton>
        <PrimaryButton type="button" :disabled="loading" :loading="loading" @click="handleLogin('superadmin')">
          Login as SuperAdmin
        </PrimaryButton>
        <PrimaryButton type="button" :disabled="loading" :loading="loading" @click="handleLogin('developer')">
          Login as Developer
        </PrimaryButton>
        <PrimaryButton type="button" :disabled="loading" :loading="loading" @click="handleLogin('staff')">
          Login as Staff
        </PrimaryButton>
      </div>
    </form>

    <p class="mt-6 text-center text-sm text-gray-600">
      Don’t have an account?
      <Nuxt-link to="/register" class="text-blue-500 hover:underline">Sign up</Nuxt-link>
    </p>
  </FormLayout>
</template>
<script setup>
import ValidationError from "~/components/Common/ValidationError.vue";
import BaseInput from "~/components/Common/BaseInput.vue";
import PrimaryButton from "~/components/Common/PrimaryButton.vue";
import FormLayout from "~/layouts/Guest/FormLayout.vue";

const auth = useAuthStore();
const loading = ref(false);
const commonStore = useCommonStore();
const common = commonStore;

const form = reactive({
  email: "",
  password: "",
});

// Handles login for different roles
const handleLogin = async (type) => {
  loading.value = true;

  // Set predefined credentials based on role
  if (type === 'user') {
    form.email = 'user1@dc.com.pk';
    form.password = '123456789';
  } else if (type === 'superadmin') {
    form.email = 'superadmin@dc.com.pk';
    form.password = '123456789';
  } else if (type === 'developer') {
    form.email = 'developer@dc.com.pk';
    form.password = '123456789';
  }
  else if (type === 'staff') {
    form.email = 'staff@dc.com.pk';
    form.password = '123456789';
  }

  try {
    await auth.attemptLogin(form);
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
