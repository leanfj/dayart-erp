import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class UsuarioInputDTO {
  id?: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
  isActive?: boolean;

  dataCadastro?: Date;
  dataAtualizacao?: Date;
}
