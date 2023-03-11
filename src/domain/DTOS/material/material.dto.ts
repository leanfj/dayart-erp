import { IsNotEmpty } from "class-validator";
import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { ValorElo7 } from "../../valueObjects/produto/valorElo7";
export class ProdutoInputDTO {
  id?: string;

  @IsNotEmpty()
  titulo: string;
  codigo?: RandomCode | string;
  @IsNotEmpty()
  descricao: string;
  @IsNotEmpty()
  valorVenda: number;
  @IsNotEmpty()
  valorCusto: number;
  @IsNotEmpty()
  materiais: string[];
  @IsNotEmpty()
  prazoProducao: string;
  
  valorElo7?: ValorElo7 | number;

  dataCadastro?: Date;
  dataAtualizacao?: Date;
}
