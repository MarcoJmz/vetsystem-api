import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty({ message: 'El nombre del dueño no puede estar vacío' })
  @IsString({ message: 'El nombre del dueño debe ser un string' })
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

  @IsNotEmpty({ message: 'El ID del dueño no puede estar vacío' })
  @IsInt({ message: 'El ID del dueño debe ser un número entero' })
  ownerId: number;
}
