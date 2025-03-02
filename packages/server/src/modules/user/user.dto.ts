import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'
import { OmitType } from '@nestjs/swagger'

import { Gender } from './user-profile.entity'

export class UserProfileDto {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  avatar: string

  @IsPhoneNumber()
  @IsString()
  @IsOptional()
  phone: string

  @IsString()
  @IsOptional()
  bio: string

  @IsString()
  @IsOptional()
  address: string

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender



  last_login_ip: string
}


export class UserDto {
  @Length(6, 20)
  @IsString()
  @IsNotEmpty()
  password: string

  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  username: string

  @ValidateNested()
  @Type(() => UserProfileDto)
  @IsObject()
  @IsOptional()
  profile: UserProfileDto



}

export class UpdateUserDto extends OmitType(UserDto, ['username']) {
}
