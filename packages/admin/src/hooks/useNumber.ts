import { useState } from 'react'

export const useNumber = (defaultNum: number, token: string = 'USE_NUM'): [number, (num: number) => void] => {
  const key = `X-BLOG-NUM:${ token }`
  // 获取 localStorage 的
  const number = localStorage.getItem(key) || defaultNum
  const [num, _setNum] = useState(number)
  const setNum= (newNum: number) => {
    localStorage.setItem(key, String(newNum))
    _setNum(newNum)
  }
  return [+num, setNum]
}
