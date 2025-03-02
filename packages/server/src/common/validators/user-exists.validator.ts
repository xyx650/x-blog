import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Injectable } from '@nestjs/common'

import { UserService } from '@/modules/user/user.service'

@ValidatorConstraint({ async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {

  constructor(private readonly userService: UserService) {}

  async validate(authorId: string) {
    const user = await this.userService.findOne(authorId)
    return !!user
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return `User ${ validationArguments?.value } does not exist`
  }

}
