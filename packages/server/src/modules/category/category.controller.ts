import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common'

import { CategoryService } from './category.service'
import { CategoryDto } from './category.dto'


@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {
  }

  @Get()
  getCategories() {
    return this.categoryService.findAll()
  }

  @Get(':id')
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOneById(id)
  }

  @Post()
  createCategory(@Body() category: CategoryDto) {
    return this.categoryService.create(category)
  }

  @Patch(':id')
  updateCategoryById(@Param('id', ParseIntPipe) id: number, @Body() category: CategoryDto) {
    return this.categoryService.updateById(id, category)
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return  this.categoryService.deleteById(id)
  }
}
