import { get, post } from './request'

export const login = async (user: ILoginPropsDto) => {
  return post('login', user)
}
