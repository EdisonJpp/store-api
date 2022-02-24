import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Param } from "./param";
import { Post } from "./post";

@Entity({ name: "t_post_params" })
export class PostParam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column({ name: "param_id" })
  paramId: number;

  @ManyToOne(() => Param)
  @JoinColumn({ name: "param_id" })
  param: Param;

  @Column({ name: "post_id" })
  postId: number;

  @ManyToOne(() => Post, { orphanedRowAction: "delete" })
  @JoinColumn({ name: "post_id" })
  post: Post;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updatedAt: Date;
}
