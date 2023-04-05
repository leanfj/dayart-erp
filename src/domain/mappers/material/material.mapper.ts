
import { Mapper } from "../../../core/shared/mapper";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Material } from "../../entities/material/material.entity";
import { MaterialInputDTO } from "domain/DTOS/material/material.dto";
import { UnidadeMedida } from "domain/entities/unidadeMedida/unidadeMedida.entity";

export abstract class MaterialMapper implements Mapper<Material> {

  public static toDomain (raw: MaterialInputDTO): Material {
    
    const material = Material.create({
        titulo: raw.titulo,
        codigo: raw.codigo,
        descricao: raw.descricao,
        valor: raw.valor,
        unidadeMedida: raw.unidadeMedida,
        quantidade: raw.quantidade,
        valorUnitario: raw.valorUnitario,
    }, new UniqueEntityID(raw.id))

    return material;
  }

  public static toPersistence (material: Material): any {
    return {
        id: material.id.toString(),
        titulo: material.titulo,
        codigo: material.codigo,
        descricao: material.descricao,
        valor: material.valor,
        unidade_medida_id: material.unidadeMedida.id.toString(),
        quantidade: material.quantidade,
        valorUnitario: material.valorUnitario,
    }
  }
}