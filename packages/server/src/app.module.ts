import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { configModuleOptions } from './config'
import { AppController } from './app.controller'
import { AppService } from './app.service'




@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions)
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
