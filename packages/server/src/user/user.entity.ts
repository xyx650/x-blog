import { Column, Entity, PrimaryGeneratedColumn /*OneToOne*/ } from 'typeorm'
// import { UserInfo } from './user-info.entity'
import { Exclude, Expose, Transform } from 'class-transformer'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true, nullable: true })
  email: string

  @Column()
  @Exclude()
  password: string

  @Column({ default: false })
  @Exclude()
  disabled: boolean // 是否禁用

  @Column({ default: false })
  @Exclude()
  is_deleted: boolean // 是否被删除

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose({ name: 'created' })
  @Transform(({ value }) => dayjs(value as Dayjs).format('YYYY-MM-DD HH:mm:ss'))
  created_at: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @Expose({ name: 'updated' })
  @Transform(({ value }) => dayjs(value as Dayjs).format('YYYY-MM-DD HH:mm:ss'))
  updated_at: Date

  // @OneToOne(() => UserInfo)
  // userInfo: UserInfo
}
