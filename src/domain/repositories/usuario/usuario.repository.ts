import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Usuario } from "../../entities/usuario/usuario.entity";

type Response = Either<AppError.UnexpectedError, Result<Usuario>>;

export interface UsuarioRepository {
  findById(id: string | UniqueEntityID): Promise<Response>;
  exists(id: string): Promise<boolean>;
  save(usuario: Usuario): Promise<Response>;
  update(id: string | UniqueEntityID, usuario: Usuario): Promise<Response>;
  delete(id: string | UniqueEntityID): Promise<Response>;
}
