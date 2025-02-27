import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserAddDto } from '../common/dto/user.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Get('get')
  getUser(@Body() body: UserAddDto) {
    // const { username, password } = body

  }

  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Post('add')
  @UseInterceptors(ClassSerializerInterceptor)
  async addUser(@Body() user: UserAddDto) {
    return await this.userService.create(user)
  }
}
