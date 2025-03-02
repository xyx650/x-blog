import { Transform } from 'class-transformer'
import type { ConfigType } from 'dayjs'

import { daytimeFormat } from '@/common/utils'

export function DatetimeTransform<T extends ConfigType>(format = 'YYYY-MM-DD HH:mm:ss') {
  return Transform(({ value }: { value: T }) => daytimeFormat(value, format))
}
