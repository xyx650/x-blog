import { IsString, IsNotEmpty, Length } from 'class-validator'

export class UserAddDto {

  @IsString()
  @IsNotEmpty()
  username: string

  @Length(8, 16)
  @IsString()
  @IsNotEmpty()
  password: string
}
