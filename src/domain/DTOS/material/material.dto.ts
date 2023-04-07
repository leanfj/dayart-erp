import { IsNotEmpty } from "class-validator";
import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { UnidadeMedida } from "../../../domain/entities/unidadeMedida/unidadeMedida.entity";
export class MaterialInputDTO {
  id?: string;
  @IsNotEmpty()
  titulo: string;
  codigo?: RandomCode | string;
  @IsNotEmpty()
  descricao: string;
  @IsNotEmpty()
  unidadeMedidaId: string;
  unidadeMedida?: UnidadeMedida;
  @IsNotEmpty()
  valor: number;
  @IsNotEmpty()
  quantidade: number;
  valorUnitario: number;
}
