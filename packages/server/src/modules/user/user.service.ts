import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './user.entity'
import { UpdateUserDto, UserDto } from './user.dto'
import { UserContextType } from '@/common/decorators'

import { getAddress } from '@/common/utils'
import { IPV4_REG } from '@/shared/constants'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async create(user: UserDto, userContext: UserContextType) {
    const { profile = {} } = user
    const { platform } = userContext
    profile['last_login_ip'] = userContext.ip
    profile['last_login_platform'] = platform
    const _user = this.userRepository.merge(
      this.userRepository.create(user),
      { profile }
    )

    void getAddress(!IPV4_REG.test(userContext.ip) ? '' : userContext.ip)
      .then(({ address, ip }) => {
        profile['last_login_address'] = address
        if (!IPV4_REG.test(userContext.ip)) {
          profile['last_login_ip'] = ip
        }
        return this.userRepository.merge(_user, { profile })
      })
      .then(u => this.userRepository.save(u))
      .catch(() => void 0)
    return this.userRepository.save(_user)
  }

  findAll() {
    return this.userRepository.find({
      relations: ['profile']
    })
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      relations: ['profile'],
      where: { id }
    })
  }

  async update(id: string, user: UpdateUserDto) {
    const _user = await this.findOne(id)
    if (!_user) {
      throw new NotFoundException(`User with id ${ id } not found`)
    }
    return await this.userRepository.save(this.userRepository.merge(_user, user))
  }
}
