import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

import { ArticleEntity } from '@/modules/article/article.entity'
import { UserProfileEntity } from './user-profile.entity'
import { DatetimeTransform } from '@/common/decorators'

@Entity('user')
export class UserEntity {

  /**
   * uuid primaryKey
   */
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * 用户名
   */
  @Column({ unique: true, update: false })
  username: string

  /**
   * 用户密码
   */
  @Column()
  @Exclude()
  password: string

  /**
   * 是否禁用
   */
  @Column({ default: false })
  @Exclude()
  disabled: boolean

  /**
   * 是否被删除
   */
  @Column({ default: false })
  @Exclude()
  deleted: boolean

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
   * 用户详细信息
   */
  @OneToOne(() => UserProfileEntity, profile => profile.user, { cascade: true })
  profile: Relation<UserProfileEntity>

  /**
   * 用户发布的文章
   */
  @OneToMany(() => ArticleEntity, articles => articles.author)
  articles: Relation<ArticleEntity[]>
}
