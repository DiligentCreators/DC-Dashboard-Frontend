<template>
  <FormLayout>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>

        <BaseInput label="Full Name" v-model="form.name" type="text"
                   class="text-gray-500"

                   placeholder="John Doe" />
        <ValidationError field="name" />

      </div>



      <div>

        <BaseInput label="Email" v-model="form.email"
                   class="text-gray-500"

                   type="email"   placeholder="example@gmail.com" />
        <ValidationError field="email" />

      </div>
      <div>

        <BaseInput label="Password"
                   class="text-gray-500"

                   v-model="form.password" type="password"   placeholder="********" />
        <ValidationError field="password" />

      </div>
      <div>
        <div>

          <BaseInput
              class="text-gray-500"

              label="Re-type Password" v-model="form.c_password" type="password"   placeholder="********" />

        </div>

      </div>

      <PrimaryButton type="submit" :disabled="loading" :loading="loading">
        Register
      </PrimaryButton>


    </form>

    <p class="mt-6 text-center text-sm text-gray-600">
      Already have an account?
      <Nuxt-link to="/login" class="text-blue-500 hover:underline">Log in</Nuxt-link>
    </p>
  </FormLayout>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth.js";
import ValidationError from "~/components/Common/ValidationError.vue";
import FormLayout from "~/layouts/Guest/FormLayout.vue";
const auth = useAuthStore();
const  loading = ref(false);
import BaseInput from "~/components/Common/BaseInput.vue";
import PrimaryButton from "~/components/Common/PrimaryButton.vue";
const form = reactive({
  name: "",
  email: "",
  password: "",
  c_password: "",
});

const handleRegister = async () => {
  const data = {
    name: form.name,
    username: form.name,
    email: form.email,
    password: form.password,
    password_confirmation: form.c_password,
  };

  loading.value = true;
  try {
    const isSuccess = await auth.attemptRegister(data);
    if (isSuccess) {
      form.name = '';
      form.email = '';
      form.password = '';
      form.c_password = '';
    }
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
