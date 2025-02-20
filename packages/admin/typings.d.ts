import '@umijs/max/typings'

import { LoginType } from '@/pages/Login'

declare global {

  interface ILoginPropsDto {
    type: LoginType
    username: string
    password: string
  }
}

