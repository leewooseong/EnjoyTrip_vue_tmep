<script setup lang="ts">
import router from '@/router'
import Id from './Id.vue'
import Nickname from './Nickname.vue'
import Password from './Password.vue'
import PasswordConfirm from './PasswordConfirm.vue'
import PasswordHint from './PasswordHint.vue'
import Submit from './Submit.vue'
// import { joinAPI } from '../../services/apis/auth.js'

const handleSubmit = async (event: Event) => {
  // get formData value
  // const formData = new FormData(event.currentTarget as HTMLFormElement)
  // const userLogId = formData.get('userId') as string
  // const userPwd = formData.get('password') as string
  // const userPwdQue = formData.get(password-hint) as string
  // const userNick = formData.get('nickname') as string
  // const joinRes = await joinAPI(userLogId, userPwd, userPwdQue, userNick)
  event.preventDefault()
  router.push('/login')
}
</script>

<template>
  <section>
    <h1>회원 가입</h1>
    <form @:submit="handleSubmit">
      <Id />
      <Nickname />
      <Password />
      <PasswordConfirm />
      <PasswordHint />
      <Submit />
    </form>
  </section>
</template>
