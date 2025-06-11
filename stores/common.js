import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
    const validationError = ref(null)
    const Invalid = ref(null);


    return { validationError,Invalid}
})