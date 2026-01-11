import { IsNumberString, IsOptional } from 'class-validator';

export class GetAppointmentQueryDto {
  @IsOptional()
  @IsNumberString()
  patient_id: number;

  @IsOptional()
  @IsNumberString()
  take: number;

  @IsOptional()
  @IsNumberString()
  skip: number;
}
