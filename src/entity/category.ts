import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { generateSlug } from '../helpers';
import { CategoryChild } from './category-child';

@Entity({ name: 't_categories' })
@Unique('t_categories_unique_slug' ['slug'])
/** This is category table*/
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @OneToMany(() => CategoryChild, (sp) => sp.parent)
  children: CategoryChild[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  /** Set slug before in insert */
  @BeforeInsert()
  setSlug() {
    this.slug = generateSlug(this.name);
  }
}
