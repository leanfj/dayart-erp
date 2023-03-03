import { LoginUseCase } from "../../../../application/useCases/autorizacao/login/login.useCase";
// import { DeleteClienteUseCase } from "../../../../application/useCases/cliente/deleteCliente/deleteCliente.useCase";
// import { GetAllClienteUseCase } from "../../../../application/useCases/cliente/getAllCliente/getAllCliente.usecase";
// import { UpdateClienteUseCase } from "../../../../application/useCases/cliente/updateCliente/updateCliente.useCase";
// import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { LoginInputDTO } from "../../../../domain/DTOS/login/loginInputDTO";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";

type Response = Either<AppError.UnexpectedError, Result<string>>;

export class LoginService {
  private loginUseCase: LoginUseCase;
  // private updateClienteUseCase: UpdateClienteUseCase;
  // private getAllClienteUseCase: GetAllClienteUseCase;
  // private deleteClienteUseCase: DeleteClienteUseCase;

  constructor() {
    this.loginUseCase = new LoginUseCase();
    // this.updateClienteUseCase = new UpdateClienteUseCase(clienteRepository);
    // this.getAllClienteUseCase = new GetAllClienteUseCase(clienteRepository);
    // this.deleteClienteUseCase = new DeleteClienteUseCase(clienteRepository);
  }

  public async login(input: LoginInputDTO, usuario: Usuario): Promise<Response> {
    try {
      const result = await this.loginUseCase.execute({input, usuario});
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<string>(result.value.getValue() as string));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  // public async getAll(): Promise<Response> {
  //   try {
  //     const result = await this.getAllClienteUseCase.execute();

  //     if (result.isLeft()) {
  //       return left(result.value);
  //     } else {
  //       const clienteList = result.value.getValue();
  //       return right(Result.ok<Cliente[] | Cliente>(clienteList));
  //     }
  //   } catch (error) {
  //     return left(new AppError.UnexpectedError(error));
  //   }
  // }

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
