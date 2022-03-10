import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 't_post_commissions' })
/** these are related between posts and commissions  */
export class PostCommission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commission: number;

  @Column({ name: 'commission_in', default: 'CASH' })
  commissionIn: 'CASH' | 'PERCENTAGE';

  @Column({ name: 'type_currency_id', default: 1 })
  typeCurrencyId: number;

  @Column({ name: 'expiration_date', nullable: true })
  expirationDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
