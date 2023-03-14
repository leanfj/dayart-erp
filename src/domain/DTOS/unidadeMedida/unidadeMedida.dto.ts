import { IsNotEmpty } from "class-validator";
export class UnidadeMedidaInputDTO {
  id?: string;
  @IsNotEmpty()
  nome: string;
  @IsNotEmpty()
  nomenclatura: string;
  @IsNotEmpty()
  categoria: string;
}
