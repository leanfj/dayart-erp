require("dotenv").config();
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { LoginInputDTO } from "../../../../domain/DTOS/login/loginInputDTO";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { LoginErrors } from "./loginErrors";

type Response = Either<AppError.UnexpectedError, Result<string>>;

export class LoginUseCase implements UseCase<{input: LoginInputDTO, usuario: Usuario}, Promise<Response>> {
  constructor() {}

  async execute(request: {input: LoginInputDTO, usuario: Usuario}): Promise<Response> {
    try {
      const { input: input, usuario } = request;

      const chekPassword = await compare(input.password, usuario.password);

      if (!chekPassword) {
        return left(new LoginErrors.PasswordOrEmailIncorrect());
      }

      const { JWT_SECRET } = process.env;
      const token = sign({ id: usuario.id.toString() }, JWT_SECRET, {
        expiresIn: "1d",
      });

      return right(Result.ok<string>(token));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
