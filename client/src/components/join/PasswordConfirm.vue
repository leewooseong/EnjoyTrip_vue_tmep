<script setup lang="ts">
import { ref, watch } from 'vue'

import { messageInfo } from '@/utils/const/messageText.js'
import IconClosedPwVue from '@/components/icons/IconClosedPw.vue'
import IconOpenedPwVue from '@/components/icons/IconOpenedPw.vue'
import { usePwStore, useSubmitStore } from '@/stores/auth'

const globalSubmitState = useSubmitStore()
const globalPw = usePwStore()
const pwText = ref('')
const pwMessage = ref<string | null>('')
const viewPw = ref(false)

watch(globalPw, (newValue, oldValue) => {
  checkSamePw(newValue.pwValue)
})

const handlePwChange = (event: Event) => {
  pwText.value = (event.target as HTMLInputElement).value
  if (pwText.value.length === 0) {
    pwMessage.value = null
    return
  }
  checkSamePw(globalPw.pwValue)
}

const checkSamePw = (firstPw: string) => {
  // console.log(firstPw, pwTssext.value, pwMessage.value)
  if (pwText.value === firstPw) {
    pwMessage.value = 'validPw2'
    globalSubmitState.submitState = { ...globalSubmitState.submitState, pw2: true }
    console.log(globalSubmitState.submitState)
    return
  }
  globalSubmitState.submitState = { ...globalSubmitState.submitState, pw2: false }
  if (pwText.value.length === 0 || firstPw.length === 0) {
    pwMessage.value = null
  } else if (pwText.value !== firstPw) {
    pwMessage.value = 'notMatchedPw'
  }
}

const handleEyeClick = (event: Event) => {
  viewPw.value = !viewPw.value
}
</script>

<template>
  <div>
    <label>
      비밀번호 확인
      <input
        :type="`${viewPw ? 'text' : 'password'}`"
        name="pwConfirm"
        placeholder="2종류 이상의 문자를 조합하여 8자 이상 입력"
        required
        :value="pwText"
        @input="handlePwChange"
      />
    </label>
    <button v-if="viewPw" type="button" @click="handleEyeClick">
      <IconOpenedPwVue class="pw-icon" />
    </button>

    <button v-else type="button" @click="handleEyeClick">
      <IconClosedPwVue class="pw-icon" />
    </button>
    <p v-if="pwMessage">{{ messageInfo[pwMessage] }}</p>
  </div>
</template>

<style scoped>
.pw-icon {
  width: 15px;
  height: 15px;
}
</style>
