import axios, { AxiosInstance } from 'axios'

const DEFAULT_ACCEPT_LANGUAGE = 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
const DEFAULT_API_ENDPOINT = 'http://localhost:8080'
const BASE_URL = `${DEFAULT_API_ENDPOINT}/api`
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=UTF-8',
  'Accept-Language': DEFAULT_ACCEPT_LANGUAGE,
}

const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: DEFAULT_HEADERS,
  })
}

export const axiosInstance = createAxiosInstance()
