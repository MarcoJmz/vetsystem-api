import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty({ message: 'El nombre del dueño no puede estar vacío' })
  @IsString({ message: 'El nombre del dueño debe ser un string' })
  name: string;

  @IsNotEmpty({ message: 'El apellido del dueño no puede estar vacío' })
  @IsString({ message: 'El apellido del dueño debe ser un string' })
  lastName: string;

  @IsNotEmpty({ message: 'El número de teléfono no puede estar vacío' })
  @IsString({ message: 'El número de teléfono debe ser un string' })
  phoneNumber?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Las notas deben ser un string' })
  notes?: string;
}
