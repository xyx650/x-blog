import dayjs, { type ConfigType } from 'dayjs'

export function daytimeFormat(date: ConfigType, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}
