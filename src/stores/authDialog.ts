import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthDialogStore = defineStore('authDialog', () => {

  const mode = ref<'login' | 'register' | false>(false)

  const loginVisible = computed(() => mode.value === 'login')
  const registerVisible = computed(() => mode.value === 'register')
  const authVisible = computed(() => mode.value !== false)

  const openLogin = () => {
    mode.value = 'login'
  }

  const openRegister = () => {
    mode.value = 'register'
  }

  const closeDialog = () => {
    mode.value = false
  }

  return {
    loginVisible,
    registerVisible,
    authVisible,
    openLogin,
    openRegister,
    closeDialog,
  }
})
