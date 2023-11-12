<script setup lang="ts">
import { messageInfo } from '@/utils/const/messageText.js'
import { duplicateIdAPI } from '@/services/apis/auth.js'
import { ref } from 'vue'
import { useSubmitStore } from '@/stores/auth'

const globalSubmitState = useSubmitStore()
// 아이디
const idText = ref('')
const idMessage = ref<string | null>('')
// 유효성 검사
const handleValidateId = async (event: Event) => {
  const { value } = event.target as HTMLInputElement
  idText.value = value

  if (idText.value === '') {
    idMessage.value = null
    return
  }

  const validIdReg = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,12}$/g
  const shortIdReg = /^.{1,5}$/ // 비밀번호 길이가 1-5 사이인지 판별
  const longIdReg = /^.{13,}$/ // 비밀번호 길이가 12자 이상인지 판별
  const validCharReg = /^[a-z0-9]+$/g // 공백이나 유효하지 않은 문자가 포함된 경우

  // 1. valid id
  if (validIdReg.test(idText.value)) {
    // idMessage.value = null
    await checkIdDuplication(idText.value)
    return
  }

  globalSubmitState.submitState = { ...globalSubmitState.submitState, id: false }
  // 2. error case
  if (shortIdReg.test(idText.value) || longIdReg.test(idText.value)) {
    idMessage.value = 'shortId'
  }
  if (!validCharReg.test(idText.value)) {
    idMessage.value = 'unableChar'
  }
}
//  중복 검사
const checkIdDuplication = async (idTextValue: string) => {
  // const result = await duplicateIdAPI(idTextValue)
  const result = await new Promise((resolve, reject) => {
    return resolve(false)
  })

  if (result) {
    idMessage.value = 'duplicateId'
    globalSubmitState.submitState = { ...globalSubmitState.submitState, id: false }
  } else {
    idMessage.value = 'validId'
    globalSubmitState.submitState = { ...globalSubmitState.submitState, id: true }
  }
}

// 비밀번호
</script>

<template>
  <div>
    <label>
      아이디
      <input
        type="text"
        name="userId"
        :placeholder="messageInfo['shortId']"
        required
        :value="idText"
        @input="handleValidateId"
      />
    </label>
    <!-- 아이디 경고 문구 작성 -->
    <p v-if="idMessage">{{ messageInfo[idMessage] }}</p>
  </div>
</template>
