import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';
import Video from './video.entity';

@Entity({ name: 'user_video' })
export default class UserVideo {
  @PrimaryGeneratedColumn()
  public id!: string;

  @OneToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user!: User;

  @OneToMany(() => Video, (video) => video.userVideo, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public videos!: Video[];

  @ManyToMany(() => Video, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  public sharedVideos!: Video[];
}
