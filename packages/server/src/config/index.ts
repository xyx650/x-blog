import { ConfigModuleOptions } from '@nestjs/config'
import Joi from 'joi'

import { ConfigEnum } from '../enums/config.enum'
import * as process from 'node:process'

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: [`.env.${process.env.NODE_ENV || ''}`, '.env'],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test'),
    [ConfigEnum.DB]: Joi.string().required(),
    [ConfigEnum.DB_PORT]: Joi.number().integer().required(),
    [ConfigEnum.DB_HOST]: Joi.string().ip()
  })
}
