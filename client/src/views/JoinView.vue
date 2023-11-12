<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Join from '../components/Join/JoinForm.vue'
import { isAuthenticatedUser } from '/src/utils/auth.js'

// check user is loggedin
const isLoggedIn = ref(false)

const getLoggedState = async () => {
  if (await isAuthenticatedUser()) {
    isLoggedIn.value = true
    return
  }
  isLoggedIn.value = false
}

onMounted(() => {
  getLoggedState()
})
</script>

<template>
  <main>
    <Join :type="`${isLoggedIn ? 'create' : 'update'}`" />
  </main>
</template>
