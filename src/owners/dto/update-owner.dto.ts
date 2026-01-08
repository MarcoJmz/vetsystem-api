import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnerDto } from './create-owner.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {
  @IsNotEmpty({ message: 'El nombre del dueño no puede estar vacío' })
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
