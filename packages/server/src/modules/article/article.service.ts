import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ArticleEntity } from './article.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  async countAll () {
    return this.articleRepository.count()
  }

  async countByArticleId(id: number) {
    return this.articleRepository.countBy({ id })
  }
}
