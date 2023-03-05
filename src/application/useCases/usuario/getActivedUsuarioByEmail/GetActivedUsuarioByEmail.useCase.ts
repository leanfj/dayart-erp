import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioRepository } from "../../../../domain/repositories/usuario/usuario.repository";
import { GetActivedUsuarioByEmailErrors } from "./GetActivedUsuarioByEmailErrors";

type Response = Either<AppError.UnexpectedError, Result<Usuario>>;

export class GetactivedUsuarioByEmailUseCase
  implements UseCase<string, Promise<Response>>
{
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(email: string): Promise<Response> {
    try {
      const usuario = await this.usuarioRepository.findActivedByEmail(email);

      if (usuario.isLeft()) {
        return left(new GetActivedUsuarioByEmailErrors.UsuarioNotActived());
      }

      return right(Result.ok<Usuario>(usuario.value.getValue()));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
