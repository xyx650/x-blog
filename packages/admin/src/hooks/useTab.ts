import { useState } from 'react'
import { useSearchParams } from '@umijs/max'

export const useTab = <T extends string>(initialValue: T, tabKey: string = 'tab'): [T, (value: T) => void] => {
  const [query, setQuery] = useSearchParams()
  const value = query.get(tabKey) as T || initialValue
  const [curTabKey, setCurTabKey] = useState(value)
  const setTab = (value: T) => {
    setCurTabKey(value)
    query.set(tabKey, value)
    setQuery(query)
  }
  return [curTabKey, setTab]
}
