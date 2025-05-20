import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Unknown' })
  author: string;

  @Column({ nullable: false })
  quote: string;
}
