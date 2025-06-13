<template>

  <FormLayout>

    <form @submit.prevent="handleLogin" class="space-y-4">
    <div>
      <BaseInput label="Email" type="email"
                 placeholder="examlpe@gmail.com"
                 class="text-gray-500"

                 v-model="form.email"/>
      <ValidationError field="email" />
    </div>

    <div>
      <BaseInput label="Password" type="password"
                 placeholder="*******"
                 class="text-gray-500"

                 v-model="form.password"/>
      <ValidationError field="password" />


    </div>
      <p v-if="common.Invalid" class="text-red-500 h-5">{{ common.Invalid }}</p>

    <div class="text-sm">

      <a href="#" class="text-blue-500 hover:underline">Forgot password?</a>
    </div>

    <PrimaryButton type="submit" :disabled="loading" :loading="loading">
      Login
    </PrimaryButton>
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
const  loading = ref(false);


const commonStore = useCommonStore();
const common = commonStore;


const form = reactive({
  email: "khan@gmail.com",
  password: "password",
});

const handleLogin = async () => {
  loading.value = true;
  try {
    await auth.attemptLogin(form);
  } catch (error) {
    console.error(error); // Optional: show error to user
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  middleware: ["guest"],
});
</script>
