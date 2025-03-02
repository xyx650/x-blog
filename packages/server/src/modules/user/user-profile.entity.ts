import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

import { UserEntity } from '@/modules/user/user.entity'
import { DatetimeTransform } from '@/common/decorators'

export enum Gender {
  MALE,
  FEMALE
}

@Entity('user-profile')
export class UserProfileEntity {

  /**
   * profile id
   */
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string

  /**
   * 邮箱
   */
  @Column({ unique: true, nullable: true })
  email: string

  /**
   * 用户头像的URL
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string

  /**
   * 可选的电话号码
   */
  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string

  /**
   * 用户个人简介
   */
  @Column({ type: 'text', nullable: true })
  bio: string

  /**
   * 用户地址
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string

  /**
   * 用户性别
   * 0-male  1-female
   */
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender

  /**
   * 上次登录时间
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose({ name: 'lastLoginTime' })
  @DatetimeTransform()
  last_login_time: Date

  /**
   * 上次登录IP
   */
  @Column({ default: '' })
  @Expose({ name: 'lastLoginIp' })
  last_login_ip: string

  /**
   * 上次登录ip location
   */
  @Column({ default: '' })
  @Expose({ name: 'lastLoginAddress' })
  last_login_address: string


  /**
   * 上次登录 平台
   */
  @Column({ default: '' })
  @Expose({ name: 'lastLoginPlatform' })
  last_login_platform: string

  /**
   * 关联用户实体
   */
  @OneToOne(() => UserEntity, (user) => user.profile, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity> // 与用户表的关系（外键）
}
