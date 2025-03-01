import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  async create(user: Partial<User>) {
    const _user = this.userRepository.merge(
      this.userRepository.create(user),
      { profile: user.profile || {} }
    )
    return this.userRepository.save(_user)
  }

  findAll () {
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

  async update(id: string, user: Partial<User>) {
    const _user = await this.findOne(id)
    if (!_user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return await this.userRepository.save(this.userRepository.merge(_user, user))
  }
}
