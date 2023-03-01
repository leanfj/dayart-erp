import { IsEmail, IsNotEmpty, IsOptional,  } from "class-validator";
export class ClienteInputDTO {
  id?: string;

  @IsNotEmpty()
  @IsOptional()
  nome: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  genero: string;

  @IsNotEmpty()
  @IsOptional()
  telefone: string;

  @IsNotEmpty()
  @IsOptional()
  endereco: string;

  @IsNotEmpty()
  @IsOptional()
  cidade: string;

  @IsNotEmpty()
  @IsOptional()
  estado: string;

  @IsNotEmpty()
  @IsOptional()
  cep: string;

  @IsNotEmpty()
  @IsOptional()
  cpf: string;

  @IsNotEmpty()
  @IsOptional()
  dataEvento: Date;

  dataCadastro?: Date;
  dataAtualizacao?: Date;
}
