import { useState } from 'react'

export interface IUseNumberOptions {
  token?: string
  storage?: 'session' | 'local'
}

export const useNumber = (defaultNum: number, {
  token = 'USE_NUM',
  storage = 'session'
}: IUseNumberOptions = {}): [number, (num: number) => void] => {
  const key = `X-BLOG-NUM:${ token }`
  const Storage = storage === 'local' ? localStorage : sessionStorage
  const number = Storage.getItem(key) || defaultNum
  const [num, _setNum] = useState(number)
  const setNum= (newNum: number) => {
    Storage.setItem(key, String(newNum))
    _setNum(newNum)
  }
  return [+num, setNum]
}
