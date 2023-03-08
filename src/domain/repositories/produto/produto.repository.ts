import { ProdutoInputDTO } from "domain/DTOS/produto/produto.dto";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Produto } from "../../entities/produto/produto.entity";


type Response = Either<AppError.UnexpectedError, Result<Produto | Produto[]>>;

export interface ProdutoRepository {
  findAll(): Promise<Response>;
  findById(id: string | UniqueEntityID): Promise<Response>;
  exists(id: string): Promise<boolean>;
  save(produto: Produto): Promise<Response>;
  update(id: string | UniqueEntityID, produto: Produto): Promise<Response>;
  delete(id: string | UniqueEntityID): Promise<Response>;
}
