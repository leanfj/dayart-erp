import { IsEmail, IsNotEmpty } from "class-validator";
export class ClienteInputDTO {
  id?: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  genero: string;

  @IsNotEmpty()
  telefone: string;

  @IsNotEmpty()
  endereco: string;

  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  estado: string;

  dataCadastro?: Date;
  dataAtualizacao?: Date;
}
