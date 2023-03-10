import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Usuario } from "../../entities/usuario/usuario.entity";

type Response = Either<AppError.UnexpectedError, Result<Usuario>>;

export interface UsuarioRepository {
  updatePassword(usuarioId: string, passwordHash: string): unknown;
  findById(id: string | UniqueEntityID): Promise<Response>;
  findByEmail(email: string): Promise<Response>;
  findActivedByEmail(email: string): Promise<Response>;
  exists(id: string): Promise<boolean>;
  save(usuario: Usuario): Promise<Response>;
  update(id: string | UniqueEntityID, usuario: Usuario): Promise<Response>;
  delete(id: string | UniqueEntityID): Promise<Response>;
}
