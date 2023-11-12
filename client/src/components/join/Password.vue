<script setup lang="ts">
import { ref } from 'vue'
import { messageInfo } from '@/utils/const/messageText.js'
import { checkContinuousInput } from '@/utils/auth.js'
import IconClosedPwVue from '@/components/icons/IconClosedPw.vue'
import IconOpenedPwVue from '@/components/icons/IconOpenedPw.vue'
import { usePwStore, useSubmitStore } from '@/stores/auth'

const globalSubmitState = useSubmitStore()
const globalPw = usePwStore()
const pwMessage = ref<string | null>('')
const viewPw = ref(false)

const handleValidatePw = (event: Event) => {
  let pwLevel = 0
  globalPw.pwValue = (event.target as HTMLInputElement).value

  if (globalPw.pwValue.length === 0) {
    pwMessage.value = null
    return
  }

  // regular expressions
  const middlePwReg = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-]{8,15}$/g
  const longPwReg = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-]{16,64}$/g
  const singleKindReg = /^(?:[A-Za-z]+|\d+|[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-]+)$/ // 입력된 문자가 한 종류인 경우
  const shortPwReg = /^.{1,7}$/ // 비밀번호 길이가 1-8 사이인지 판별
  const tooLongPwReg = /^.{65,}$/
  const validCharReg = /^[a-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-]+$/g // 공백이나 유효하지 않은 문자가 포함된 경우
  const tripleSameReg = /(.)\1\1+/ // 같은문자가 3번 이상 반복되는 경우

  // case 1. 유효한 비밀번호
  if (middlePwReg.test(globalPw.pwValue) && !singleKindReg.test(globalPw.pwValue)) {
    // 8-16 자리 유효한 비밀번호
    pwLevel += 1
    // 추가 점수 로직
    if (!tripleSameReg.test(globalPw.pwValue)) {
      pwLevel += 1
    }
    if (!checkContinuousInput(globalPw.pwValue)) {
      pwLevel += 1
    }
    setPwLevel(pwLevel)
    globalSubmitState.submitState = { ...globalSubmitState.submitState, pw1: true }
    console.log(globalSubmitState.submitState)
    return
  } else if (longPwReg.test(globalPw.pwValue)) {
    // 16 자리이상 유효한 비밀번호
    pwLevel += 1
    // 추가 점수 로직
    if (!tripleSameReg.test(globalPw.pwValue)) {
      pwLevel += 1
    }
    if (!checkContinuousInput(globalPw.pwValue)) {
      pwLevel += 1
    }
    if (!singleKindReg.test(globalPw.pwValue)) {
      pwLevel += 1
    }

    setPwLevel(pwLevel)
    globalSubmitState.submitState = { ...globalSubmitState.submitState, pw1: true }
    console.log(globalSubmitState.submitState)

    return
  }

  globalSubmitState.submitState = { ...globalSubmitState.submitState, pw1: false }

  // case 2. 유효하지 않은 비밀 번호
  if (!validCharReg.test(globalPw.pwValue)) {
    pwMessage.value = 'unableChar'
    return
  }
  if (shortPwReg.test(globalPw.pwValue)) {
    pwMessage.value = 'shortPw'
    return
  }
  if (singleKindReg.test(globalPw.pwValue)) {
    pwMessage.value = 'singleKindPw'
  }
  if (tooLongPwReg.test(globalPw.pwValue)) {
    pwMessage.value = 'tooLongPw'
  }
}

// 불가, 낮음, 보통, 안전 4개의 상태로 색 관리
const setPwLevel = (pwLevel: number) => {
  // 유효한 비밀번호이면 낮음 등급 -> yellow색으로 표시
  if (pwLevel === 1) {
    pwMessage.value = 'lowSafePw'
    return
  }

  // 추가 조건을 1개를 만족하면 보통 등급 -> orange색으로 표시
  if (pwLevel === 2) {
    pwMessage.value = 'middleSafePw'
    return
  }

  // 추가 조건을 2개 이상 만족하면 높음 등급 -> green색으로 표시
  pwMessage.value = 'highSafePw'
}

const handleEyeClick = (event: Event) => {
  viewPw.value = !viewPw.value
}
</script>
<template>
  <div>
    <label>
      <p>비밀번호</p>
      <input
        :type="`${viewPw ? 'text' : 'password'}`"
        name="password"
        placeholder="2종류 이상의 문자를 조합하여 8자 이상 입력"
        required
        :value="globalPw.pwValue"
        @input="handleValidatePw"
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
