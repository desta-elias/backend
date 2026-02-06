import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../modules/users/user.entity';

@Entity('patient_history')
export class PatientHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  bed: string;

  @Column()
  room: string;

  @Column()
  condition: string;

  @Column('int')
  age: number;

  @Column()
  gender: string;

  @Column()
  admitted: string;

  @Column('int', { default: 0 })
  bedHeadPosition: number;

  @Column('int', { default: 0 })
  bedLeftPosition: number;

  @Column('int', { default: 0 })
  bedRightPosition: number;

  @Column('int', { default: 0 })
  bedTiltPosition: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User | null;

  @CreateDateColumn()
  dischargedAt: Date;
}
