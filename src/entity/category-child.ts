import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category";
import { generateSlug } from "../helpers";
import { CategoryChildParam } from "./category-child-param";

@Entity({ name: "t_category_child" })
export class CategoryChild {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ name: "parent_id" })
  parentId: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "parent_id" })
  parent: Category;

  @OneToMany(() => CategoryChildParam, (ccp) => ccp.categoryChild)
  params: CategoryChildParam[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updatedAt: Date;

  @BeforeInsert()
  setSlug() {
    this.slug = generateSlug(this.name);
  }
}
