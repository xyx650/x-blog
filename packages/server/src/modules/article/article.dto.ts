import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Validate } from 'class-validator'
import { UserExistsValidator } from '@/common/validators'

export class ArticleDto {
  @MaxLength(8)
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsBoolean()
  @IsOptional()
  private: boolean

  @IsBoolean()
  @IsOptional()
  drafted: boolean

  @MaxLength(20)
  @IsString()
  @IsOptional()
  password: string

  @IsInt()
  @IsOptional()
  priority: number

}
