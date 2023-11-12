import { $axios } from './axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
console.log(BASE_URL)

export const joinAPI = async (args: any) => {
  const apiRes = await fetch(`${BASE_URL}/users/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    },
    body: JSON.stringify(args)
  })

  return apiRes.ok ? 'success' : 'fail'
}

export const duplicateIdAPI = async (text: any) => {
  const apiRes = await fetch(`${BASE_URL}/users/check-id`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    },
    body: JSON.stringify(text)
  })

  return !!apiRes.ok
}

export const duplicateNicknameAPI = async (text: string) => {
  const apiRes = await fetch(`${BASE_URL}/users/check-nickname`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    },
    body: JSON.stringify(text)
  })

  return !!apiRes.ok
}

// Login API
interface LoginRequest {
  userLogId: string
  userPwd: string
}
type LoginResult = {
  status: number
  message: string
  data: { accessToken: string; refreshToken: string }
}
export const loginAPI = async (args: LoginRequest): Promise<LoginResult> => {
  // const loginRes = await $axios.post(
  //   `api/users/login`,
  //   // `${BASE_URL}/users/login`,
  //   { ...args }
  // )

  const loginRes = await fetch(`users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    },
    body: JSON.stringify(args)
  })

  const result = await loginRes.json()
  return result.data
}

export const logoutAPI = async () => {
  const apiRes = await fetch(`/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include'
    }
  })

  return apiRes.ok ? 'success' : 'fail'
}

export const getUserInfo = async () => {
  const apiRes = await $axios.get(`/users/user`)
  return apiRes.data.data
}
