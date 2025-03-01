import { Module } from '@nestjs/common'

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { ConfigEnum } from '../shared/enums/config.enum'


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true, // 自动注册 Entities
        synchronize: configService.get(ConfigEnum.DB_SYNCHRONIZE), // 是否自动同步
        retryAttempts: configService.get(ConfigEnum.DB_RETRY),
        type: configService.get(ConfigEnum.DB),
        host: configService.get(ConfigEnum.DB_HOST),
        port: configService.get(ConfigEnum.DB_PORT),
        database: configService.get(ConfigEnum.DB_DATABASE),
        username: configService.get(ConfigEnum.DB_USERNAME),
        password: configService.get(ConfigEnum.DB_PASSWORD)
      }) as TypeOrmModuleOptions
    })
  ]
})
export class DatabaseModule {
}
