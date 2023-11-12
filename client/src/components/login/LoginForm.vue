<script setup lang="ts">
import { ref } from 'vue'
import IconClosedPwVue from '@/components/icons/IconClosedPw.vue'
import IconOpenedPwVue from '@/components/icons/IconOpenedPw.vue'
import { loginAPI } from '@/services/apis/auth.js'
import router from '@/router'

const idText = ref('')
const pwText = ref('')
const viewPw = ref(false)

const handleSubmit = async (event: Event) => {
  event.preventDefault()

  // get formData value
  const formData = new FormData(event.currentTarget as HTMLFormElement)
  const userLogId = formData.get('userId') as string
  const userPwd = formData.get('password') as string

  console.log(userLogId, userPwd)
  const loginRes = await loginAPI({ userLogId, userPwd })
  // const { accessToken, refreshToken } = loginRes.data
  // sessionStorage.setItem('access', accessToken)
  // localStorage.setItem('refresh', refreshToken)

  if (loginRes) {
    router.push('/')
  }
}

const handleEyeClick = (event: Event) => {
  viewPw.value = !viewPw.value
}
</script>

<template>
  <h1>로그인</h1>
  <form @:submit="handleSubmit">
    <label>
      <p>아이디</p>
      <input type="text" name="userId" placeholder="아이디" required />
    </label>
    <div>
      <label>
        <p>비밀번호</p>
        <input
          :type="`${viewPw ? 'text' : 'password'}`"
          name="password"
          placeholder="비밀번호"
          required
        />
      </label>

      <button v-if="viewPw" type="button" @click="handleEyeClick">
        <IconOpenedPwVue class="pw-icon" />
      </button>

      <button v-else type="button" @click="handleEyeClick">
        <IconClosedPwVue class="pw-icon" />
      </button>
    </div>
    <button type="submit">로그인</button>
  </form>
</template>

<style scoped>
.pw-icon {
  width: 15px;
  height: 15px;
}
</style>
