import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_params' })
/** params table  */
export class Param {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column({ name: 'parameter_type', default: 'CHECKBOX' })
  parameterType: string;

  @Column({
    type: 'jsonb',
    array: false,
    nullable: true,
  })
  options: Array<{ id: number; name: string }>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
