import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'


import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ConfigModule } from './common/config/config.mudule'


@Module({
  imports: [
    ConfigModule
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //
    //   })
    // })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
