import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common'


import { UserService } from './user.service'
import { UpdateUserDto, UserDto } from './user.dto'
import { UserContext, type UserContextType } from '@/common/decorators'

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
  async getUsers() {
    return this.userService.findAll()
  }

  @Post('register')
  register(@Body() user: UserDto, @UserContext() userContext: UserContextType) {
    return this.userService.create(user, userContext)
  }

  @Patch(':id')
  updateUserById(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user)
  }
}
