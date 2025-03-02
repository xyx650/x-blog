import { getClientIp } from 'request-ip'
import type { Request } from 'express'

import { IPV4_REG } from '@/shared/constants'

export function getIp(req: Request) {
  const clientIp = getClientIp(req)
  return clientIp?.match(IPV4_REG)?.[0] ?? clientIp ?? ''
}

export async function getAddress(_ip: string) {
  try {
    const { address, ip } = await fetch(`https://api.vore.top/api/IPdata?ip=${_ip}`)
      .then(res => res.json())
      .then((data: any) => {

        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          address: data?.adcode?.o as string,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          ip: (data?.ipinfo?.text || _ip) as string
        }
      })
    return {
      address: address || '获取失败',
      ip: ip || '获取失败'
    }
  } catch  {
    return {
      address: '获取失败',
      ip: _ip || '获取失败'
    }
  }
}
