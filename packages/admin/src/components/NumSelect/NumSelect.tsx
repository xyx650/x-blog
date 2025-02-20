import { Select } from 'antd'
import type { FC } from 'react'


export interface INumSelectProps {
  value: number
  unit: string
  setValue: (value: number) => void
  options?: number[]
}

const createOptions = (nums: number[], unit: string) => {
  return nums.map(num => {
    return {
      label: `近${ num }${ unit }`,
      value: num
    }
  })
}

const NumSelect: FC<INumSelectProps> = ({
  value,
  unit = '',
  setValue,
  options = [3, 5, 7, 10, 15, 30]
}) => {
  return (
    <Select
      size={ 'small' }
      value={ value }
      onChange={ setValue }
      options={ createOptions(options, unit) }
    />
  )
}

export default NumSelect
