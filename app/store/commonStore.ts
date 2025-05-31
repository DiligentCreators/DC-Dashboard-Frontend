// stores/commonStore.ts
import { create } from 'zustand'

type CommonStore = {
  validationErrors: string[]
  setValidationErrors: (errors: string[]) => void
  clearValidationErrors: () => void
}

export const useCommonStore = create<CommonStore>((set) => ({
  validationErrors: [],
  setValidationErrors: (errors) => set({ validationErrors: errors }),
  clearValidationErrors: () => set({ validationErrors: [] }),
}))
