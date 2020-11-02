import { IsNotEmpty } from 'class-validator';
import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import UserVideo from './user-video.entity';

@Entity({ name: 'video' })
export default class Video {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  @IsNotEmpty()
  public name!: string;

  @Column({ nullable: true })
  public description!: string;

  @Column()
  @IsNotEmpty()
  public link!: string;

  @Column()
  @IsNotEmpty()
  public type!: string;

  @ManyToOne(() => UserVideo, (userVideo) => userVideo.videos, {
    onDelete: 'CASCADE',
  })
  userVideo!: UserVideo;
}
