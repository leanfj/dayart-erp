import { IsEmail, IsNotEmpty  } from "class-validator";

export class ClienteInputDTO {
  id?: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  dataCadastro?: Date;
  dataAtualizacao?: Date;
}
