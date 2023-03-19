import { IsNotEmpty } from "class-validator";
import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { Material } from "domain/entities/material/material.entity";
export class ProdutoInputDTO {
  // id?: string;

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
  materiais: Material[];
  @IsNotEmpty()
  prazoProducao: string;
  
}
