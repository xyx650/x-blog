import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from 'typeorm'
import { Expose } from 'class-transformer'

import { ArticleEntity } from '@/modules/article/article.entity'
import { DatetimeTransform } from '@/common/decorators'


@Entity('category')
export class CategoryEntity {

  /**
   * 分类 id
   */
  @PrimaryGeneratedColumn()
  id: number

  /**
   * 分类名称
   */
  @Column({ unique: true })
  name: string

  /**
   * 分类描述
   */
  @Column()
  description: string

  /**
   * 是否私有的
   */
  @Column({ default: false })
  private: boolean


  /**
   * 创建时间
   */
  @CreateDateColumn({ type: 'timestamp' })
  @Expose({ name: 'created' })
  @DatetimeTransform()
  created_at: Date

  /**
   * 更新时间
   */
  @UpdateDateColumn({ type: 'timestamp' })
  @Expose({ name: 'updated' })
  @DatetimeTransform()
  updated_at: Date

  @OneToMany(() => ArticleEntity, article => article.category)
  @JoinColumn({ name: 'article_id' })
  articles: Relation<ArticleEntity[]>
}
