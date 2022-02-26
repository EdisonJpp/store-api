import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { generateSlug } from "../helpers";
import { CategoryChild } from "./category-child";

@Entity({ name: "t_categories" })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @OneToMany(() => CategoryChild, (sp) => sp.parent)
  children: CategoryChild[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updatedAt: Date;

  @BeforeInsert()
  setSlug() {
    this.slug = generateSlug(this.name);
  }
}
