import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./post";

@Entity({ name: "t_stores", schema: "public" })
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: "user_id" })
  userId: number;

  @OneToMany(() => Post, (sp) => sp.store)
  posts: Post[];

  @Column({ name: "email" })
  email: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updatedAt: Date;
}
