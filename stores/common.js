import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
    const validationError = ref(null)
    const Invalid = ref(null)

    // Method to set and auto-clear validationError
    const setValidationError = (errors) => {
        validationError.value = errors

        setTimeout(() => {
            validationError.value = null
        }, 4000) // 3 seconds
    }

    return { validationError, Invalid, setValidationError }
})
