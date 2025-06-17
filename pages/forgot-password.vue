<template>
  <FormLayout>
    <form @submit.prevent="handleForgotPassword" class="space-y-4">

      <h1 class="text-xl text-gray-800">Forgot Password</h1>
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



      <p v-if="common.Invalid" class="text-red-500 h-5">{{ common.Invalid }}</p>

      <div class="text-sm text-gray-500">
        Do not forgot to check SPAM box.
      </div>

        <PrimaryButton type="submit" :disabled="loading" :loading="loading" >
         send password reset email
        </PrimaryButton>

    </form>

    <p class="mt-6  text-sm text-gray-600">
      <Nuxt-link to="/login" class="text-blue-500 hover:underline">Back to login</Nuxt-link>
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
});

const handleForgotPassword = async () => {
  loading.value = true;
  try {
    const success = await auth.sendPasswordResetEmail(form.email);
    if (success) {
      // await navigateTo({
      //   path: "/verify-code",
      // });
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};


definePageMeta({
  middleware: ["guest"],
});
useHead({
  title: 'Forgot Password',
})
</script>
