import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Owner } from 'src/owners/entities/owner.entity';

export class CreatePatientDto {
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

  @IsNotEmpty({ message: 'El dueño no puede estar vacío' })
  owner: Owner;
}
