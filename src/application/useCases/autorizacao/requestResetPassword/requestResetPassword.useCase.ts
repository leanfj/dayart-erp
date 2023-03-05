// require("dotenv").config();
import { hash, genSalt } from "bcrypt";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioRepository } from "../../../../domain/repositories/usuario/usuario.repository";
import { randomBytes } from "crypto";
import { TokenRepository } from "../../../../domain/repositories/token/token.repository";
import { Token } from "../../../../domain/entities/token/token.entity";

type Response = Either<AppError.UnexpectedError, Result<string>>;

export class RequestResetPasswordUseCase
  implements UseCase<string, Promise<Response>>
{
  constructor(
    private usuarioRepository: UsuarioRepository,
    private tokenRepository: TokenRepository
  ) {}

  async execute(email: string): Promise<Response> {
    try {
      const usuarioOrError = await this.usuarioRepository.findByEmail(email);

      if (usuarioOrError.isLeft()) {
        return left(usuarioOrError.value);
      }

      const usuario = usuarioOrError.value.getValue() as unknown as Usuario;

      let tokenData = await this.tokenRepository.findByUsuarioId(usuario.id);
      
      if (tokenData.isRight()) {
        await this.tokenRepository.delete(tokenData.value.getValue().id);
      }

      const salt = await genSalt(12);

      let resetToken = randomBytes(32).toString("hex");

      const tokenHash = await hash(resetToken, salt);

      const token = Token.create({
        token: tokenHash,
        usuarioId: usuario.id.toString(),
        dataCadastro: new Date(),
      });

      await this.tokenRepository.save(token);

      const { CLIENT_URL } = process.env;

      const link = `${CLIENT_URL}/#/change-password?token=${resetToken}&usuarioId=${usuario.id.toString()}`;

      return right(Result.ok<string>(link));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
