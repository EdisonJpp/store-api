const bcrypt = require('bcrypt');

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { generateSlug, SALT_ROUNDS } from '../helpers/index';

@Unique('email_already_exist', ['email'])
@Unique('username_already_exist', ['userName'])
@Entity({ name: 't_users', schema: 'public' })
/** this is user table, are related with store and post */
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'slug' })
  slug: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;

  /** Set slug and hash before in insert  */
  @BeforeInsert()
  async beforeInsert() {
    this.slug = generateSlug(this.name);
    await this.hash();
  }

  /** Set hash before in update */
  @BeforeUpdate()
  async beforeUpdate() {
    await this.hash();
  }

  /** Set hash */
  async hash() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
  }
}
