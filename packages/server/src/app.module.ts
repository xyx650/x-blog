import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ConfigModule } from './common/config/config.mudule'
import { DatabaseModule } from './database/database.module'
import { UserModule } from '@/modules/user/user.module'
import { ArticleModule } from '@/modules/article/article.module'
import { CategoryModule } from '@/modules/category/category.module'


@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    ArticleModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
