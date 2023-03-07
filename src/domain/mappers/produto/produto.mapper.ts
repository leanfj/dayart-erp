
import { Mapper } from "../../../core/shared/mapper";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Produto } from "../../../domain/entities/produto/produto.entity";

export abstract class ProdutoMapper implements Mapper<Produto> {

  public static toDomain (raw: any): Produto {
    
    const produto = Produto.create({
        titulo: raw.titulo,
        codigo: raw.codigo,
        descricao: raw.descricao,
        valorVenda: raw.valorVenda,
        valorCusto: raw.valorCusto,
        materiais: raw.materiais,
        prazoProducao: raw.prazoProducao,
        valorElo7: raw.valorElo7
    }, new UniqueEntityID(raw.id))

    return produto;
  }

  public static toPersistence (produto: Produto): any {
    return {
        titulo: produto.titulo,
        codigo: produto.codigo,
        descricao: produto.descricao,
        valorVenda: produto.valorVenda,
        valorCusto: produto.valorCusto,
        materiais: produto.materiais,
        prazoProducao: produto.prazoProducao,
        valorElo7: produto.valorVenda
    }
  }
}