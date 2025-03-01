import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from 'typeorm'
import { Exclude, Transform } from 'class-transformer'
import { User } from 'src/user/user.entity'
import dayjs, { type Dayjs } from 'dayjs'

export enum Gender {
  MALE,
  FEMALE
}

@Entity()
export class UserProfile {

  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string

  @Column({ unique: true, nullable: true })
  email: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string // 用户头像的URL

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string // 可选的电话号码

  @Column({ type: 'text', nullable: true })
  bio: string // 用户个人简介

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string // 用户地址

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender // 用户性别

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Transform(({ value }) => dayjs(value as Dayjs).format('YYYY-MM-DD HH:mm:ss'))
  last_login: Date // 用户最后登录时间

  @OneToOne(() => User, (user) => user.profile, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User> // 与用户表的关系（外键）
}
