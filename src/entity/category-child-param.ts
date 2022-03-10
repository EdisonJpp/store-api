import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryChild } from './category-child';
import { Param } from './param';

@Entity({ name: 't_category_child_params' })
/** This is relations table categoryChild and params */
export class CategoryChildParam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'param_id' })
  paramId: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Param)
  @JoinColumn({ name: 'param_id' })
  param: Param;

  @ManyToOne(() => CategoryChild)
  @JoinColumn({ name: 'category_id' })
  categoryChild: CategoryChild;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
