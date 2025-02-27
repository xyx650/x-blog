import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserAddDto } from '../common/dto/user.dto'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  async create(user: UserAddDto): Promise<User> {
    return await this.userRepository.save(user)
  }

  findAll () {
    return this.userRepository.find()
  }
}
