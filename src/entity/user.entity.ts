import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export default class User {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  @IsNotEmpty()
  public name!: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @Column()
  @MinLength(6)
  @IsNotEmpty()
  public password!: string;
}
