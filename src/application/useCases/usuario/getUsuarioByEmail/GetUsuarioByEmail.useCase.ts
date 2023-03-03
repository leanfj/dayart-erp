import { UniqueEntityID } from "core/domain/uniqueIdEntity";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioRepository } from "../../../../domain/repositories/usuario/usuario.repository";
import { GetUsuarioByEmailErrors } from "./GetUsuarioByEmailErrors";
import { UsuarioMapper } from "../../../../domain/mappers/usuario/usuario.mapper";

type Response = Either<AppError.UnexpectedError, Result<Usuario>>;

export class GetUsuarioByEmailUseCase
  implements UseCase<string, Promise<Response>>
{
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(email: string): Promise<Response> {
    try {
      const usuario = await this.usuarioRepository.findByEmail(email);

      if (usuario.isLeft()) {
        return left(new GetUsuarioByEmailErrors.UsuarioNotExists());
      }

      return right(Result.ok<Usuario>(UsuarioMapper.toDomain(usuario)));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
