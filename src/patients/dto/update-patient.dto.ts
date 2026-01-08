import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsNotEmpty({ message: 'El nombre del paciente no puede estar vacío' })
  @IsString({ message: 'El nombre del paciente debe ser un string' })
  name: string;

  @IsNotEmpty({ message: 'La especie no puede estar vacía' })
  @IsString({ message: 'La especie debe ser un string' })
  species: string;

  @IsNotEmpty({ message: 'La raza no puede estar vacía' })
  @IsString({ message: 'La raza debe ser un string' })
  breed: string;

  @IsOptional()
  @IsString({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  birthDate: string;

  @IsOptional()
  @IsString({ message: 'Las notas deben ser un string' })
  notes?: string;

  @IsOptional()
  attendsSchool: boolean;

  @IsNotEmpty({ message: 'El ID del dueño no puede estar vacío' })
  @IsInt({ message: 'El ID del dueño debe ser un número entero' })
  ownerId: number;
}
