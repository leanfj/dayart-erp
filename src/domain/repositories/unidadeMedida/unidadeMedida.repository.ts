import { UnidadeMedidaInputDTO } from "../../DTOS/unidadeMedida/unidadeMedida.dto";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { UnidadeMedida } from "../../entities/unidadeMedida/unidadeMedida.entity";


type Response = Either<AppError.UnexpectedError, Result<UnidadeMedida | UnidadeMedida[]>>;

export interface UnidadeMedidaRepository {
  findAll(): Promise<Response>;
  findById(id: string | UniqueEntityID): Promise<Response>;
  exists(id: string): Promise<boolean>;
  save(unidadeMedida: UnidadeMedida): Promise<Response>;
  update(id: string | UniqueEntityID, input: UnidadeMedidaInputDTO): Promise<Response>;
  delete(id: string | UniqueEntityID): Promise<Response>;
}
