require("dotenv").config();
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { LoginInputDTO } from "../../../../domain/DTOS/login/loginInputDTO";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioRepository } from "../../../../domain/repositories/usuario/usuario.repository";
import { LoginErrors } from "./loginErrors";

type Response = Either<AppError.UnexpectedError, Result<string>>;

export class LoginUseCase implements UseCase<LoginInputDTO, Promise<Response>> {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(input: LoginInputDTO): Promise<Response> {
    try {
      const usuario = await this.usuarioRepository.findByEmail(input.email);

      if (usuario.isLeft()) {
        return left(new LoginErrors.PasswordOrEmailIncorrect());
      }

      const usuarioData = usuario.value.getValue() as Usuario;

      const chekPassword = await compare(input.password, usuarioData.password);

      if (!chekPassword) {
        return left(new LoginErrors.PasswordOrEmailIncorrect());
      }

      const { JWT_SECRET } = process.env;
      const token = sign({ id: usuarioData.id.toString() }, JWT_SECRET, {
        expiresIn: "1d",
      });

      return right(Result.ok<string>(token));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
