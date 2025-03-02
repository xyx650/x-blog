import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Expose } from 'class-transformer'

import { UserEntity } from '@/modules/user/user.entity'
import { CategoryEntity } from '@/modules/category/category.entity'
import { DatetimeTransform } from '@/common/decorators'

@Entity('article')
export class ArticleEntity {

  /**
   * primaryKey
   */
  @PrimaryGeneratedColumn()
  id: number

  /**
   * 标题
   */
  @Column()
  title: string

  /**
   * 内容
   */
  @Column({ type: 'text' })
  content: string


  /**
   * 浏览人数, 暂以 ip 区分
   */
  @Column({ default: 0 })
  viewer: number

  /**
   * 浏览次数
   */
  @Column({ default: 0 })
  visited: number


  /**
   * @desc 是否隐藏
   * 选择隐藏后，前台将不会该显示文章的所有信息，该文章也不会计入总字数、标签、分类数量统计或者出现在时间线界面。但后台将正常显示该文章，并可以取消隐藏状态
   */
  @Column({ default: false })
  hidden: boolean

  /**
   * @desc 是否草稿
   * 草稿即未发布
   */
  @Column({ default: false })
  drafted: boolean

  /**
   * @desc 是否加密(如果有，则文章自动为加密，且该字段为密码)
   */
  @Column({ default: '' })
  password: string


  /**
   * @desc 置顶优先级：数字，留空或者为 0 表示不顶置
   * 置顶文章默认按时间倒序倒序，优先级高的的会置顶在前
   */
  @Column({ default: 0 })
  priority: number

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


  /**
   * 最后访问时间
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose({ name: 'lastVisitedTime' })
  @DatetimeTransform()
  last_visited_time: Date

  /**
   * 作者
   */
  @ManyToOne(() => UserEntity, user => user.articles)
  @JoinColumn({ name: 'user_id' })
  author: Relation<UserEntity>

  /**
   * 分类
   */
  @ManyToOne(() => CategoryEntity, category => category.articles)
  @JoinColumn({ name: 'category_id' })
  category: Relation<CategoryEntity>
}
