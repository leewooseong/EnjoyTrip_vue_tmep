<script setup lang="ts">
import { ref } from 'vue'
import { useSubmitStore } from '@/stores/auth'

const hintText = ref('')
const globalSubmitState = useSubmitStore()

const handleHintChange = (event: Event) => {
  hintText.value = (event.target as HTMLInputElement).value
  if (hintText.value.length === 0) {
    globalSubmitState.submitState = { ...globalSubmitState.submitState, pwHint: false }
    return
  } else {
    globalSubmitState.submitState = { ...globalSubmitState.submitState, pwHint: true }
    console.log(globalSubmitState.submitState)
  }
}
</script>

<template>
  <div>
    <label for="password-hint">비밀번호 힌트</label>
    <select name="hints">
      <option value="">--비민번호 힌트를 목록--</option>
      <option value="나의 보물 제 1호는?">나의 보물 제 1호는?</option>
      <option value="내가 살던 고향은?">내가 살던 고향은?</option>
      <option value="어릴적 내 별명은?">어릴적 내 별명은?</option>
    </select>
    <input
      id="password-hint"
      name="password-hint"
      placeholder="질문에 대한 답을 입력해주세요"
      required
      v-model="hintText"
      @input="handleHintChange"
    />
  </div>
</template>

<style scoped></style>
