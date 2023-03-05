// require("dotenv").config();
import { EmailServiceRepository } from "domain/repositories/email/emaikService.repository";
import { UseCase } from "../../../core/application/useCase";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { UsuarioRepository } from "domain/repositories/usuario/usuario.repository";
import { Usuario } from "domain/entities/usuario/usuario.entity";

type Response = Either<AppError.UnexpectedError, Result<string>>;
type EmailInput = {
  email: string;
  link: string;
};

export class SendRequestResetPasswordEmailUseCase
  implements UseCase<EmailInput, Promise<Response>>
{
  constructor(
    private emailService: EmailServiceRepository,
    private usuarioRepository: UsuarioRepository
  ) {}

  async execute({ email, link }: EmailInput): Promise<Response> {
    try {
      const usuarioOrError = await this.usuarioRepository.findByEmail(email);

      if (usuarioOrError.isLeft()) {
        return left(usuarioOrError.value);
      }

      const usuario = usuarioOrError.value.getValue() as unknown as Usuario;

      await this.emailService.send(
        usuario.email,
        "Password Reset Request",
        {
          nome: usuario.nome,
          link: link,
        },
        "./template/requestResetPassword.handlebars"
      );

      return right(Result.ok<string>("E-mail sended"));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
