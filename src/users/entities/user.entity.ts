import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ShoppingPreference } from 'src/shopping-preferences/entities/shopping-preference.entity';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true, type: 'date' })
  dob: Date;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => ShoppingPreference)
  @JoinTable()
  shoppingPreferences: ShoppingPreference[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
