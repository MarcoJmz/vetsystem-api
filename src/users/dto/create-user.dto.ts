import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
  @IsString({ message: 'El nombre de usuario debe ser un string' })
  username: string;

  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;

  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  @IsString({ message: 'El rol debe ser un string' })
  role: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}
