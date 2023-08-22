/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  ITodoID: number;

  @Column({ length: 500 })
  IDescription: string;

  @Column('date')
  ICompletionDate: Date;

  @Column('boolean')
  IComplete: boolean;
}
