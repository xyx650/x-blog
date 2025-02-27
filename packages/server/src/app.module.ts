import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ConfigModule } from './common/config/config.mudule'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'


@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
