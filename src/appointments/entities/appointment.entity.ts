import { Patient } from '../../patients/entities/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  NOT_SHOWN = 'not_shown',
}

export enum AppointmentReason {
  CHECKUP = 'checkup',
  VACCINATION = 'vaccination',
  SURGERY = 'surgery',
  EMERGENCY = 'emergency',
  STERILIZATION = 'sterilization',
  BATHING_GROOMING = 'bathing_grooming',
  OTHER = 'other',
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'varchar' })
  dateTime: string;

  @Column({ type: 'enum', enum: AppointmentReason })
  reason: AppointmentReason;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status: AppointmentStatus;

  @Column({ type: 'integer' })
  durationMinutes: number;

  @ManyToOne(() => Patient, (patient) => patient.id, { eager: true })
  patient: Patient;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes?: string;

  @Column({ type: 'varchar', nullable: true })
  cancelledAt?: string;

  @Column({ type: 'varchar', nullable: true })
  updatedAt?: string;
}
