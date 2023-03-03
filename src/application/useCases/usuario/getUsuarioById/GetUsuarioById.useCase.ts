import { UniqueEntityID } from "core/domain/uniqueIdEntity";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioRepository } from "../../../../domain/repositories/usuario/usuario.repository";
import { GetUsuarioByIdErrors } from "./GetUsuarioByIdErrors";
import { UsuarioMapper } from "../../../../domain/mappers/usuario/usuario.mapper";

type Response = Either<AppError.UnexpectedError, Result<Usuario>>;

export class GetUsuarioByIdUseCase
  implements UseCase<string | UniqueEntityID, Promise<Response>>
{
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(id: string | UniqueEntityID): Promise<Response> {
    try {
      const usuario = await this.usuarioRepository.findById(id);

      if (usuario.isLeft()) {
        return left(new GetUsuarioByIdErrors.UsuarioNotExists());
      }

      return right(Result.ok<Usuario>(UsuarioMapper.toDomain(usuario)));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
