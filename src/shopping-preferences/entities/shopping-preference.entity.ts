import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShoppingPreference {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    text: string;
  
    constructor(partial: Partial<ShoppingPreference>) {
      Object.assign(this, partial);
    }
}
