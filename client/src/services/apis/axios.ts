import axios from 'axios'

export const $axios = axios.create({
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})
