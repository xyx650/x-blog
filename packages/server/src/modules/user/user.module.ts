import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { UserProfileEntity } from './user-profile.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserProfileEntity])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
}
