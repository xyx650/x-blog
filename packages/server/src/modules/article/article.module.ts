import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { ArticleEntity } from './article.entity'

const ArticleEntityModule = TypeOrmModule.forFeature([ArticleEntity])

@Module({
  imports: [
    ArticleEntityModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService, ArticleEntityModule]
})
export class ArticleModule {
}
