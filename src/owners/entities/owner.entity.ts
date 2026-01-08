import { Patient } from '../../patients/entities/patient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  // Owner phone number
  @Column({ type: 'varchar', length: 16, nullable: true })
  phoneNumber?: string;

  // Owner email
  @Column({ type: 'varchar', length: 100, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 320, nullable: true })
  notes?: string;

  @OneToMany(() => Patient, (patient) => patient.owner, { cascade: true })
  patients: Patient[];
}
