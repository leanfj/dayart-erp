import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Cliente } from "../../entities/cliente/cliente.entity";


type Response = Either<AppError.UnexpectedError, Result<Cliente | Cliente[]>>;

export interface ClienteRepository {
  findAll(): Promise<Cliente[]>;
  findById(id: string | UniqueEntityID): Promise<Response>;
  exists(id: string): Promise<boolean>;
  save(cliente: Cliente): Promise<void>;
  update(id: string | UniqueEntityID, cliente: Cliente): Promise<Cliente>;
  delete(id: string | UniqueEntityID): Promise<Response>;
}
