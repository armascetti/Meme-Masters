import * as axiosApp from 'axios'

const memeApi = axiosApp.default.create({
  baseURL: process.env.MEMES_API_BASE_URL,
  timeout: 5000
})

export {
  memeApi
}