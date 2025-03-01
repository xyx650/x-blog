import { Column, Entity, PrimaryGeneratedColumn, OneToOne, Relation } from 'typeorm'
import { UserProfile } from './user-profile.entity'
import { Exclude, Expose, Transform } from 'class-transformer'
import dayjs, { type Dayjs } from 'dayjs'

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, update: false })
  username: string

  @Column({ })
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

  @OneToOne(() => UserProfile, profile => profile.user, { cascade: true })
  profile: Relation<UserProfile>
}
