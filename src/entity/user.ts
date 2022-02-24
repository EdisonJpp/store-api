import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Unique("email_already_exist", ["email"])
@Unique("username_already_exist", ["userName"])
@Entity({ name: "t_users", schema: "public" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: "user_name" })
  userName: string;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "email" })
  email: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updatedAt: Date;
}
