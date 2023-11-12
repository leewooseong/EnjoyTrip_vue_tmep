import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const usePwStore = defineStore('globalPw', () => {
  const pwValue = ref('')

  return { pwValue }
})

export const useSubmitStore = defineStore('globalSubmitState', () => {
  const submitState = ref({
    id: false,
    pw1: false,
    pw2: false,
    pwHint: false,
    nickname: false
  })

  const isSubmitValid = computed(() => {
    const result = Object.values(submitState.value).includes(false)
    return result
  })
  return { submitState, isSubmitValid }
})

export const useUserInfo = defineStore('useUserInfo', () => {
  const userInfo = ref()
  const isAuthenticated = ref(false)
  const isAuthorized = ref(false)

  return {
    userInfo,
    isAuthenticated,
    isAuthorized
  }
})
