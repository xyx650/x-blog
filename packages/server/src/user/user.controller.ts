import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserAddDto } from '../common/dto/user.dto'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Get('all')
  getUsers() {
    return this.userService.findAll()
  }

  @Post('add')
  addUser(@Body() user: UserAddDto) {
    const _user = new User()
    _user.username = user.username
    _user.password = user.password
    return this.userService.create(_user)
  }
}
