<script setup lang="ts">
import { useSubmitStore } from '@/stores/auth'

const globalSubmitState = useSubmitStore()
console.log(globalSubmitState.isSubmitValid)
</script>

<template>
  <button type="submit" :disabled="globalSubmitState.isSubmitValid">회원가입</button>
</template>

<style scoped></style>
