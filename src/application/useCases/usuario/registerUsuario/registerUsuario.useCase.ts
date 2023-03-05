import { validatorDTO } from "../../../../core/domain/validatorDTO";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioRepository } from "../../../../domain/repositories/usuario/usuario.repository";
import { RegisterUsuarioErrors } from "./registerUsuarioErrors";
import bcrypt from "bcrypt";

type Response = Either<AppError.UnexpectedError, Result<Usuario>>;

export class RegisterUsuarioUseCase
  implements UseCase<UsuarioInputDTO, Promise<Response>>
{
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(input: UsuarioInputDTO): Promise<Response> {
    const validOrError = await validatorDTO(UsuarioInputDTO, input, {});
    if (validOrError.isLeft()) {
      return left(validOrError.value);
    }

    try {
      const usuarioExists = await this.usuarioRepository.exists(input.email);

      if (usuarioExists) {
        return left(
          new RegisterUsuarioErrors.UsuarioAlreadyExists(input.email)
        );
      }

      const salt = await bcrypt.genSalt(12);

      const passwordHash = await bcrypt.hash(input.password, salt);

      const usuario = Usuario.create({
        nome: input.nome,
        email: input.email,
        password: passwordHash,
        isActive: input.isActive,
        dataCadastro: new Date(),
      });

      await this.usuarioRepository.save(usuario);

      return right(Result.ok<Usuario>(usuario));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
