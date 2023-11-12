<script setup lang="ts">
import { messageInfo } from '@/utils/const/messageText.js'
import { duplicateNicknameAPI } from '@/services/apis/auth.js'
import { ref } from 'vue'
import { useSubmitStore } from '@/stores/auth'

const globalSubmitState = useSubmitStore()
// 닉네임
const nicknameText = ref('')
const nicknameMessage = ref<string | null>('')
// 유효성 검사
const handleValidateNickname = async (event: Event) => {
  const { value } = event.target as HTMLInputElement
  nicknameText.value = value

  const validNicknameReg = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,16}$/g // 영문, 숫자, 한글을 입력받는다.
  if (validNicknameReg.test(nicknameText.value)) {
    checkIdDuplication(nicknameText.value)
    return
  }

  globalSubmitState.submitState = { ...globalSubmitState.submitState, nickname: false }
  if (nicknameText.value === '') {
    nicknameMessage.value = null
    return
  } else {
    nicknameMessage.value = 'unableChar'
  }
}
//  중복 검사
const checkIdDuplication = async (nicknameTextValue: string) => {
  // const result = await duplicateIdAPI(nicknameTextValue)
  const result = await new Promise((resolve, reject) => {
    return resolve(false)
  })

  if (result) {
    nicknameMessage.value = 'duplicateNickname'
    globalSubmitState.submitState = { ...globalSubmitState.submitState, nickname: false }
  } else {
    nicknameMessage.value = 'validNickname'
    globalSubmitState.submitState = { ...globalSubmitState.submitState, nickname: true }
    console.log(globalSubmitState.submitState)
  }
}

// 비밀번호
</script>

<template>
  <div>
    <label>
      닉네임
      <input
        type="text"
        name="userNickname"
        placeholder="닉네임을 입력해주세요."
        required
        :value="nicknameText"
        @input="handleValidateNickname"
      />
    </label>
    <!-- 아이디 경고 문구 작성 -->
    <p v-if="nicknameMessage">{{ messageInfo[nicknameMessage] }}</p>
  </div>
</template>
