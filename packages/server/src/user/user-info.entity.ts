import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { User } from 'src/user/user.entity'

@Entity()
export class UserInfo {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string // 用户头像的URL

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string // 可选的电话号码

  @Column({ type: 'text', nullable: true })
  bio: string // 用户个人简介

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string // 用户地址

  @Column({ type: 'bit', length: 1, nullable: true })
  gender: string // 用户性别

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_login: Date // 用户最后登录时间

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User // 与用户表的关系（外键）
}
