import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  AppointmentReason,
  AppointmentStatus,
} from '../entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  dateTime: string;

  @IsEnum(AppointmentReason)
  @IsNotEmpty()
  reason: AppointmentReason;

  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  durationMinutes: number;

  @IsNotEmpty()
  patient: Patient;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  notes?: string;
}
