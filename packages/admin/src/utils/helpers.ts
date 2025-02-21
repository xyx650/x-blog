import dayjs from 'dayjs'

export const getRecentTimeDescription = (timestamp?: string| number | Date) => {
  if (!timestamp) return '-'

  const c = dayjs().diff(dayjs(timestamp), 'seconds')
  if (c <= 60) {
    return c + '秒前'
  } else if (c <= 60 * 60) {
    return Math.floor(c / 60) + '分钟前'
  } else if (c <= 60 * 60 * 60) {
    return Math.floor(c / 60 / 60) + '小时前'
  } else if (c <= 60 * 60 * 60 * 24) {
    return Math.floor(c / 60 / 60 / 24) + '天前'
  }
}

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}
