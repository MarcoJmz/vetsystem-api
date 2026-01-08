import { Owner } from '../../owners/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  // Patient name
  @Column({ type: 'varchar', length: 50 })
  name: string;

  // Patient Birthdate
  @Column({ type: 'varchar', nullable: true })
  birthDate: string;

  // Patient species (e.g., dog, cat)
  @Column({ type: 'varchar', length: 30, nullable: true })
  species: string;

  // Patient breed
  @Column({ type: 'varchar', length: 30, nullable: true })
  breed: string;

  @Column({ type: 'varchar', length: 320, nullable: true })
  notes?: string;

  @Column({ type: 'boolean', default: false })
  attendsSchool: boolean;

  @ManyToOne(() => Owner)
  owner: Owner;
}
