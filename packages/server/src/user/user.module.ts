import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserProfile } from './user-profile.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
