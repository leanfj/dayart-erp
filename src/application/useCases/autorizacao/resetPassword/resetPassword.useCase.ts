// require("dotenv").config();
import { hash, genSalt, compare } from "bcrypt";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { UsuarioRepository } from "../../../../domain/repositories/usuario/usuario.repository";
import { TokenRepository } from "../../../../domain/repositories/token/token.repository";
import { TokenErrors } from "./resetTokenErrors";

type Response = Either<AppError.UnexpectedError, Result<string>>;

type input = {
  usuarioId: string;
  token: string;
  password: string;
};

export class ResetPasswordUseCase implements UseCase<input, Promise<Response>> {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute({ usuarioId, token, password }: input): Promise<Response> {
    try {
      //   const usuarioOrError = await this.usuarioRepository.findByEmail(email);
      const tokenOrError = await this.tokenRepository.findByUsuarioId(
        usuarioId
      );

      if (tokenOrError.isLeft()) {
        return left(tokenOrError.value);
      }

      const isValid = await compare(token, tokenOrError.value.getValue().token);

      if (!isValid) {
        return left(new TokenErrors.TokenInvalid());
      }
      const salt = await genSalt(12);
      const passwordHash = await hash(password, salt);

      await this.usuarioRepository.updatePassword(usuarioId, passwordHash);

      const usuarioOrError = await this.usuarioRepository.findById(usuarioId);

      if (usuarioOrError.isLeft()) {
        return left(usuarioOrError.value);
      }

      await this.tokenRepository.delete(tokenOrError.value.getValue().id);

      return right(Result.ok<string>("Password reseted with success"));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
