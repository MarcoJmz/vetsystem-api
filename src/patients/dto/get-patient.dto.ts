import { IsNumberString, IsOptional } from 'class-validator';

export class GetPatientQueryDto {
  @IsOptional()
  @IsNumberString()
  owner_id: number;

  @IsOptional()
  @IsNumberString()
  take: number;

  @IsOptional()
  @IsNumberString()
  skip: number;
}
