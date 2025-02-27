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

  create(user: UserAddDto): Promise<User> {
    return this.userRepository.save(user)
  }

  findAll () {
    return this.userRepository.find()
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id }
    })
  }
}
