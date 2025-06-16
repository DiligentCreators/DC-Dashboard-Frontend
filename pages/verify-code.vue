<template>
  <FormLayout>
    <form @submit.prevent="handleVerifyCode" class="space-y-6">
      <h1 class="text-xl font-bold text-gray-800">Verify Code</h1>

      <div class="flex justify-between gap-2 max-w-xs mx-auto">
        <input
            v-for="(digit, index) in codeDigits"
            :key="index"
            ref="codeInput"
            type="text"
            maxlength="1"
            class="w-12 h-12 text-center text-xl border rounded-md focus:ring-2 focus:outline-none text-gray-600"
            v-model="codeDigits[index]"
            @input="handleInput($event, index)"
            @keydown.backspace.prevent="handleBackspace(index)"
        />
      </div>

      <p v-if="common.Invalid" class="text-red-500 h-5 text-center">{{ common.Invalid }}</p>

      <div class="text-sm text-gray-500 text-center">
        Please check your inbox or spam folder for the verification code.
      </div>

      <div class="flex justify-center">
        <PrimaryButton type="submit" :disabled="loading" :loading="loading">
          Verify Code
        </PrimaryButton>
      </div>

      <p class="mt-6 text-sm text-gray-600 text-center">
        Didn't receive the code?
        <NuxtLink to="/forgot-password" class="text-blue-500 hover:underline">Resend</NuxtLink>
      </p>
    </form>
  </FormLayout>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import ValidationError from "~/components/Common/ValidationError.vue";
import PrimaryButton from "~/components/Common/PrimaryButton.vue";
import FormLayout from "~/layouts/Guest/FormLayout.vue";

const auth = useAuthStore();
const commonStore = useCommonStore();
const common = commonStore;

const loading = ref(false);
const codeDigits = ref(["", "", "", "", "", ""]);
const codeInput = ref([]);

const handleInput = (event, index) => {
  const value = event.target.value;

  if (/^\d$/.test(value)) {
    codeDigits.value[index] = value;

    if (index < 5) {
      nextTick(() => {
        codeInput.value[index + 1]?.focus();
      });
    }
  } else {
    codeDigits.value[index] = '';
  }
};

const handleBackspace = (index) => {
  if (codeDigits.value[index] === '') {
    if (index > 0) {
      codeDigits.value[index - 1] = '';
      nextTick(() => {
        codeInput.value[index - 1]?.focus();
      });
    }
  } else {
    codeDigits.value[index] = '';
  }
};

const handleVerifyCode = async () => {
  loading.value = true;
  const code = codeDigits.value.join('');

  try {
    const verified = await auth.verifyResetCode(code);

    if (verified) {
      return navigateTo("/reset-password");
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
</script>
