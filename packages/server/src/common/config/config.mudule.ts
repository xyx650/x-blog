import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import Joi from 'joi'

import { ConfigEnum } from '../../enums/config.enum'


@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV ? [`.env.${ process.env.NODE_ENV }`, '.env'] : '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test'),
        [ConfigEnum.DB]: Joi.string().required(),
        [ConfigEnum.DB_PORT]: Joi.number().integer().required(),
        [ConfigEnum.DB_HOST]: Joi.string().ip()
      })
    })
  ]
})
export class ConfigModule {}
