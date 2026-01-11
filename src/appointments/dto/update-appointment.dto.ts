import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
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

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsNotEmpty()
  @IsString()
  dateTime: string;

  @IsEnum(AppointmentReason)
  @IsNotEmpty()
  reason: AppointmentReason;

  @IsEnum(AppointmentStatus)
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
