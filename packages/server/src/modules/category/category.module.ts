import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { CategoryEntity } from './category.entity'
import { ArticleModule } from '@/modules/article/article.module'

@Module({
  imports: [
    ArticleModule,
    TypeOrmModule.forFeature([CategoryEntity])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {
}
