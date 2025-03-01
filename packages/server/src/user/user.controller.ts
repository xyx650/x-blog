import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Get()
  getUsers() {
    return this.userService.findAll()
  }

  @Post('add')
  addUser(@Body() user: Partial<User>) {
    return this.userService.create(user)
  }

  @Patch(':id')
  updateUserById(@Param('id') id: string, @Body() user: Partial<User>) {
    return this.userService.update(id, user)
  }
}
