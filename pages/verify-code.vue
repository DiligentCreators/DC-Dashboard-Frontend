<template>
  <FormLayout>
    <form @submit.prevent="handleVerifyCode" class="space-y-6">
      <h1 class="text-xl font-bold text-gray-800">Verify Code</h1>

      <div class="flex justify-between gap-2 max-w-xs mx-auto">
        <input
            v-for="(digit, index) in codeDigits"
            :key="index"
            ref="input"
            type="text"
            maxlength="1"
            class="w-12 h-12 text-center text-xl font-medium border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 outline-none text-gray-600 bg-white transition-all duration-200"
            v-model="codeDigits[index]"
            @input="handleInput($event, index)"
            @keydown.backspace.prevent="handleBackspace(index)"
        />

      </div>

      <p v-if="commonStore.validationError" class="text-red-500 text-sm text-center h-5">
        {{ commonStore.validationError }}
      </p>

      <div class="text-sm text-gray-500 text-center">
        Please check your inbox or spam folder for the verification code.
      </div>

      <div class="flex justify-center">
        <PrimaryButton
            type="submit"
            :disabled="loading"
            :loading="loading"
            class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
        >
          Verify Code
        </PrimaryButton>
      </div>

      <div class="mt-6 text-sm text-red-600 text-center" aria-live="polite">
        <span v-if="cooldown > 0" class="flex items-center justify-center gap-2">
          <svg class="w-6 h-6 relative" viewBox="0 0 36 36">
            <circle
                class="stroke-gray-200"
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke-width="4"
            />
            <circle
                class="stroke-red-600 origin-center -rotate-90"
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke-width="4"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="progress"
                style="transition: stroke-dashoffset 1s linear;"
            />
          </svg>
          Resend in {{ cooldown }}s
        </span>
        <button
            v-else
            type="button"
            @click="handleResendOtp"
            class="text-gray-500 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
            :disabled="loading"
            aria-label="Resend verification code"
        >
          Resend
        </button>
      </div>
    </form>
  </FormLayout>
</template>


<script setup>
import { ref, computed, nextTick } from 'vue';
import PrimaryButton from "~/components/Common/PrimaryButton.vue";
import FormLayout from "~/layouts/Guest/FormLayout.vue";
import { useAuthStore } from '~/stores/auth';
import { useCommonStore } from '~/stores/common';
import ValidationError from "~/components/Common/ValidationError.vue";

const authStore = useAuthStore();
const commonStore = useCommonStore();
const loading = ref(false);
const cooldown = ref(0);
const codeDigits = ref(['', '', '', '', '', '']);
const input = ref([]);

// Circle radius = 16, so circumference = 2πr
const circumference = computed(() => 2 * Math.PI * 16);

// Adjusted to 15 seconds
const progress = computed(() => circumference.value * (1 - cooldown.value / 15));

const startCooldown = () => {
  cooldown.value = 15; // <-- Set to 15 seconds
  const timer = setInterval(() => {
    cooldown.value--;
    if (cooldown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

const handleResendOtp = async () => {
  try {
    loading.value = true;
    commonStore.validationError = ''; // Clear previous errors
    await authStore.resendOtp();
    startCooldown();
  } catch (error) {
    console.error('Resend OTP error:', error);
    commonStore.validationError = error.response?.data?.message || 'Failed to resend OTP';
  } finally {
    loading.value = false;
  }
};

const handleInput = (event, index) => {
  const value = event.target.value;
  if (/^\d$/.test(value)) {
    codeDigits.value[index] = value;
    if (index < 5) {
      nextTick(() => {
        input.value[index + 1]?.focus();
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
        input.value[index - 1]?.focus();
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
    const verified = await authStore.verifyResetCode(code);
    if (verified) {
      return navigateTo('/reset-password');
    }
  } catch (error) {
    console.error('Verify code error:', error);
    commonStore.validationError = error.response?.data?.message || 'Invalid verification code';
  } finally {
    loading.value = false;
  }
};

useHead({
  title: 'Verify Code',
});
</script>
