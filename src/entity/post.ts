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
import { generateSlug } from "../helpers";
import { CategoryChild } from "./category-child";
import { PostCommission } from "./post-commission";
import { PostParam } from "./post-param";
import { PostStatus } from "./post-status";
import { Store } from "./store";
import { TypeCurrency } from "./type-currency";
// import { TypeCurrency } from "./type-currency";
import { UserEntity } from "./user";

@Entity({ name: "t_posts" })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  price: number;

  @Column("text", { array: true })
  images: string[];

  @Column()
  description: string;

  @Column({ name: "status_id", default: 1 })
  statusId: number;

  @ManyToOne(() => PostStatus)
  @JoinColumn({ name: "status_id" })
  status: PostStatus;

  @Column({ name: "user_id", nullable: true })
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ name: "store_id", nullable: true })
  storeId: number;

  @ManyToOne(() => Store)
  @JoinColumn({ name: "store_id" })
  store: Store;

  @Column({ name: "category_id" })
  categoryId: number;

  @ManyToOne(() => CategoryChild)
  @JoinColumn({ name: "category_id" })
  category: CategoryChild;

  @Column({ name: "type_currency_id", default: 1 })
  typeCurrencyId: number;

  @ManyToOne(() => TypeCurrency)
  @JoinColumn({ name: "type_currency_id" })
  typeCurrency: TypeCurrency;

  @ManyToOne(() => PostCommission, {
    cascade: true,
    orphanedRowAction: "delete",
  })
  @JoinColumn()
  commission: PostCommission;

  @OneToMany(() => PostParam, (pp) => pp.post, { cascade: true })
  params: PostParam[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updatedAt: Date;

  @BeforeInsert()
  setSlug() {
    this.slug = generateSlug(this.name);
  }
}
