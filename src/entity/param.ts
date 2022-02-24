import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

enum ParamType {
  INPUT,
  CHECKBOX,
}

@Entity({ name: "t_params" })
export class Param {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column({ name: "parameter_type", default: "CHECKBOX" })
  parameterType: string;

  @Column({
    type: "jsonb",
    array: false,
    // default: () => "'[]'",
    nullable: true,
  })
  options: Array<{ id: number; name: string }>;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updatedAt: Date;
}
