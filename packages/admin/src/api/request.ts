import { request } from '@@/plugin-request'

const PREFIX = '/api/'


export const get = (url: string, params = {}, options = {}) => {
  return request(PREFIX + url, { ...options, params })
}

export const post = (url: string, data = {}, options = {}) => {
  return request(PREFIX + url, { ...options, data, method: 'POST' })
}
