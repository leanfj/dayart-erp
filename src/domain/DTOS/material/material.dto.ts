import { IsNotEmpty } from "class-validator";
import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
export class MaterialInputDTO {
  id?: string;
  @IsNotEmpty()
  titulo: string;
  @IsNotEmpty()
  codigo?: RandomCode | string;
  @IsNotEmpty()
  descricao: string;
  @IsNotEmpty()
  unidadeMedida: string;
  @IsNotEmpty()
  valor: number;
}
