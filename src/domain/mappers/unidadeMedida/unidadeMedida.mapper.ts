
import { Mapper } from "../../../core/shared/mapper";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { UnidadeMedida } from "../../entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaInputDTO } from "domain/DTOS/unidadeMedida/unidadeMedida.dto";

export abstract class UnidadeMedidaMapper implements Mapper<UnidadeMedida> {

  public static toDomain (raw: UnidadeMedidaInputDTO): UnidadeMedida {
    
    const unidadeMedida = UnidadeMedida.create({
        nome: raw.nome,
        nomenclatura: raw.nomenclatura,
        categoria: raw.categoria,
    }, new UniqueEntityID(raw.id))

    return unidadeMedida;
  }

  public static toPersistence (unidadeMedida: UnidadeMedida): any {
    return {
        nome: unidadeMedida.nome,
        nomenclatura: unidadeMedida.nomenclatura,
        categoria: unidadeMedida.categoria,
    }
  }
}