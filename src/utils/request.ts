import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './cookies'
import multiLanguage from '@/multi-language/multi-language'
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  //
  // baseURL: process.env && process.env.NODE_ENV == 'development' ? 'https://localhost:44334/api/v2' : 'http://10.55.2.25:9001/api/v2',
  baseURL:
    process.env && process.env.NODE_ENV == 'development'
      ? 'http://10.175.5.59:2581/api/v2'
      : 'http://10.175.5.59:2581/api/v2',

  // 越南服务器
  // baseURL: process.env && process.env.NODE_ENV == "development" ? 'https://localhost:44334/api/v2' : 'http://10.175.5.59:9001/api/v2',

  timeout: 5000
})

// Request interceptors
service.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    const token = getToken()
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = token
      config.headers.Authorization = 'Bearer ' + token
      config.headers['Content-Type'] = 'application/json; charset=utf-8'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.statusCode != 200) {
      Message({
        message: res.errors || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      console.error(res.errors)
      return Promise.reject(new Error(res.message || 'Error'))

      // 返回“pending”状态的Promise对象
      // 利用这一特性，当新对象保持“pending”状态时，原Promise链将会中止执行。
      // return new Promise(() => { });
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

/**
 * reqeust method types
 */
export enum REQUEST_METHODS {
  GET = 'GET',
  PUT = 'PUT',
  UPDATE = 'PUT',
  POST = 'POST',
  ADD = 'POST',
  DELETE = 'DELETE',
  REMOVE = 'DELETE'
}

/**
 * get request
 * @param url request path
 * @param params query params
 * @returns
 */
export async function get(url: string, params?: any): Promise<any> {
  const result = await service({
    url,
    method: REQUEST_METHODS.GET,
    params
  })
  return result
}

/**
 * post request
 * @param url request path
 * @param data request body params
 * @returns
 */
export function add(url: string, data: any): Promise<any> {
  return service({
    url,
    method: REQUEST_METHODS.ADD,
    data
  })
}

/**
 * put request
 * @param url request path
 * @param data request body params
 * @returns
 */
export function update(url: string, data: any): Promise<any> {
  return service({
    url,
    method: REQUEST_METHODS.UPDATE,
    data
  })
}

/**
 * delete request
 * @param url request path
 * @param data request body params
 * @returns
 */
export function del(url: string, data?: any): Promise<any> {
  return service({
    url,
    method: REQUEST_METHODS.DELETE,
    data
  })
}
