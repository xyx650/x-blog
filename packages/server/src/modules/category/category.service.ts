import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CategoryEntity } from './category.entity'
import { CategoryDto } from './category.dto'
import { ArticleService } from '@/modules/article/article.service'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly articleService: ArticleService
  ) {}

  create (category: Partial<CategoryEntity>) {
    return this.categoryRepository.save(this.categoryRepository.create(category))
  }

  async findAll() {
    return this.categoryRepository.find()
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne({
      where: { id }
    })
  }

  async updateById(id: number, category: CategoryDto) {
    const _category = await this.findOne(id)
    if (!_category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }

    return this.categoryRepository.save(
      this.categoryRepository.merge(_category, category)
    )
  }

  async deleteById(id: number) {
    const _category = await this.findOne(id)
    if (!_category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }
    const existNum = await this.articleService.countByArticleId(id)
    if (existNum) {
      throw new NotAcceptableException(`Category with id ${id} is related to article[s]`)
    }
    return this.categoryRepository.remove(_category)
  }
}
