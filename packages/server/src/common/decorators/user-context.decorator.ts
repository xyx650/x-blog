import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'
import { getIp, getPlatform } from '@/common/utils'

export type UserContextType = {
  ip: string
  platform: ReturnType<typeof getPlatform>
}

export const UserContext = createParamDecorator((
  _: unknown,
  ctx: ExecutionContext
): UserContextType => {
  const req = ctx.switchToHttp().getRequest<Request>()

  const ip = getIp(req)

  const platform = getPlatform(req.headers['user-agent'] || '')

  return { ip, platform }
})

