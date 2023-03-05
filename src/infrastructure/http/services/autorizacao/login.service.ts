import { RequestResetPasswordUseCase } from "../../../../application/useCases/autorizacao/requestResetPassword/requestResetPassword.useCase";
import { LoginUseCase } from "../../../../application/useCases/autorizacao/login/login.useCase";
// import { DeleteClienteUseCase } from "../../../../application/useCases/cliente/deleteCliente/deleteCliente.useCase";
// import { GetAllClienteUseCase } from "../../../../application/useCases/cliente/getAllCliente/getAllCliente.usecase";
// import { UpdateClienteUseCase } from "../../../../application/useCases/cliente/updateCliente/updateCliente.useCase";
// import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { LoginInputDTO } from "../../../../domain/DTOS/login/loginInputDTO";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioDBRepository } from "../../../../infrastructure/repositories/usuario/usuarioDB.repository";
import { TokenDBRepository } from "../../../../infrastructure/repositories/token/tokenDB.repository";
import { SendRequestResetPasswordEmailUseCase } from "../../../../application/useCases/email/sendRequestResetPasswordEmail.useCase";
import { GmailEmailServiceRepository } from "../../../../infrastructure/email/GmailEmailServiceRepository";
import { ResetPasswordUseCase } from "../../../../application/useCases/autorizacao/resetPassword/resetPassword.useCase";
import { SendResetPasswordEmailUseCase } from "../../../../application/useCases/email/sendResetPasswordEmail.useCase";

type Response = Either<
  AppError.UnexpectedError,
  Result<{ token: string; usuarioId: string } | string>
>;

export class LoginService {
  private loginUseCase: LoginUseCase;
  private requestResetPasswordUseCase: RequestResetPasswordUseCase;
  private resetPasswordUseCase: ResetPasswordUseCase;
  private sendRequestResetPasswordEmailUseCase: SendRequestResetPasswordEmailUseCase;
  private sendResetPasswordEmailUseCase: SendResetPasswordEmailUseCase;
  // private getAllClienteUseCase: GetAllClienteUseCase;
  // private deleteClienteUseCase: DeleteClienteUseCase;
  readonly usuarioRepository = new UsuarioDBRepository();
  readonly tokenRepository = new TokenDBRepository();
  readonly emailServiceRepository = new GmailEmailServiceRepository();

  constructor() {
    this.loginUseCase = new LoginUseCase();
    this.resetPasswordUseCase = new ResetPasswordUseCase(
      this.usuarioRepository,
      this.tokenRepository
    );
    this.requestResetPasswordUseCase = new RequestResetPasswordUseCase(
      this.usuarioRepository,
      this.tokenRepository
    );
    this.sendRequestResetPasswordEmailUseCase =
      new SendRequestResetPasswordEmailUseCase(
        this.emailServiceRepository,
        this.usuarioRepository
      );
    this.sendResetPasswordEmailUseCase = new SendResetPasswordEmailUseCase(
      this.emailServiceRepository,
      this.usuarioRepository
    );
    // this.updateClienteUseCase = new UpdateClienteUseCase(clienteRepository);
    // this.getAllClienteUseCase = new GetAllClienteUseCase(clienteRepository);
    // this.deleteClienteUseCase = new DeleteClienteUseCase(clienteRepository);
  }

  public async login(
    input: LoginInputDTO,
    usuario: Usuario
  ): Promise<Response> {
    try {
      const result = await this.loginUseCase.execute({ input, usuario });
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(
          Result.ok<{ token: string; usuarioId: string }>(
            result.value.getValue()
          )
        );
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async requestResetPassword(email: string): Promise<Response> {
    try {
      const linkOrError = await this.requestResetPasswordUseCase.execute(email);

      if (linkOrError.isLeft()) {
        return left(linkOrError.value);
      }

      const link = linkOrError.value.getValue();

      const sendEmailOrError =
        await this.sendRequestResetPasswordEmailUseCase.execute({
          email,
          link,
        });

      if (sendEmailOrError.isLeft()) {
        return left(sendEmailOrError.value);
      }

      return right(Result.ok<string>("E-mail sended"));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async resetPassword(
    usuarioId: string,
    token: string,
    password: string
  ): Promise<Response> {
    try {
      const resetOrError = await this.resetPasswordUseCase.execute({
        usuarioId,
        token,
        password,
      });

      if (resetOrError.isLeft()) {
        return left(resetOrError.value);
      }

      const sendEmailOrError = await this.sendResetPasswordEmailUseCase.execute(
        usuarioId
      );

      if (sendEmailOrError.isLeft()) {
        return left(sendEmailOrError.value);
      }

      return right(Result.ok<string>("E-mail sended"));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  // public async update(
  //   cliente: ClienteInputDTO,
  //   id: UniqueEntityID
  // ): Promise<Response> {
  //   try {
  //     const validOrError = await validatorDto(ClienteInputDTO, cliente, {skipMissingProperties: true});
  //     if (validOrError.isLeft()) {
  //       return left(validOrError.value);
  //     }
  //     const result = await this.updateClienteUseCase.execute({
  //       ...cliente,
  //       id: id.toString(),
  //     });
  //     if (result.isLeft()) {
  //       return left(result.value);
  //     } else {
  //       return right(Result.ok<Cliente>(result.value.getValue()));
  //     }
  //   } catch (error) {
  //     return left(new AppError.UnexpectedError(error));
  //   }
  // }

  // public async delete(id: UniqueEntityID): Promise<Response> {
  //   try {
  //     const result = await this.deleteClienteUseCase.execute(id);
  //     if (result.isLeft()) {
  //       return left(result.value);
  //     } else {
  //       return right(Result.ok<Cliente>(result.value.getValue()));
  //     }
  //   } catch (error) {
  //     return left(new AppError.UnexpectedError(error));
  //   }
  // }
}
