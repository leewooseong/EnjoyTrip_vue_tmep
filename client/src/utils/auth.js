import { getUserInfo } from '../services/apis/auth.ts'

const continuousInfo = []
// keyboard 각 라인에 대한 정보(lowercase + uppercase)
const keyboardLineList = [
  // lowercase
  '`1234567890-=',
  'qwertyuiop[]',
  'asdfghjkl;\'"',
  'zxcvbnm,./',
  // uppercase
  '~!@#$%^&*()_+',
  'QWERTYUIOP{}',
  'ASDFGHJKL:"',
  'ZXCVBNM<>?'
]

// 3단어씩 잘라서 continuousInput에 넣어줘야 한다.
keyboardLineList.forEach((line) => {
  for (let i = 0; i < line.length - 2; i += 1) {
    continuousInfo.push(line.substring(i, i + 3))
  }

  for (let i = 0; i < line.length - 2; i += 1) {
    const reversedLine = line.split('').reverse().join('')
    continuousInfo.push(reversedLine.substring(i, i + 3))
  }
})

export const checkContinuousInput = (input) => {
  return continuousInfo.some((info) => input.includes(info))
}

// 사용자가 로그인 했는지 판별하는 함수
export const isAuthenticatedUser = async () => {
  const apiRes = await getUserInfo()

  if (apiRes?.userLogId && apiRes?.userNick) return true
  return false
}

// 해당 페이지에 대해 자신이 권한이 있는지 판별하는 함수
export const isAuthorizedUser = async (authorizedUserNick) => {
  const apiRes = await getUserInfo()

  if (authorizedUserNick === apiRes?.userNick) return true
  return false
}
