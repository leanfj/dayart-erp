import { GetUsuarioByIdUseCase } from "../../../../application/useCases/usuario/getUsuarioById/GetUsuarioById.useCase";
import { GetUsuarioByEmailUseCase } from "../../../../application/useCases/usuario/getUsuarioByEmail/GetUsuarioByEmail.useCase";
import { RegisterUsuarioUseCase } from "../../../../application/useCases/usuario/registerUsuario/registerUsuario.useCase";
import { GetactivedUsuarioByEmailUseCase } from "../../../../application/useCases/usuario/getActivedUsuarioByEmail/GetActivedUsuarioByEmail.useCase";
// import { DeleteClienteUseCase } from "../../../../application/useCases/cliente/deleteCliente/deleteCliente.useCase";
// import { GetAllClienteUseCase } from "../../../../application/useCases/cliente/getAllCliente/getAllCliente.usecase";
// import { UpdateClienteUseCase } from "../../../../application/useCases/cliente/updateCliente/updateCliente.useCase";
// import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioRepository } from "../../../../domain/repositories/usuario/usuario.repository";

type Response = Either<AppError.UnexpectedError, Result<Usuario>>;

export class UsuarioService {
  private registerUsuarioUseCase: RegisterUsuarioUseCase;
  private getUsuarioByEmailUseCase: GetUsuarioByEmailUseCase;
  private getActivedUsuarioByEmailUseCase: GetactivedUsuarioByEmailUseCase;
  private getUsuarioByIdUseCase: GetUsuarioByIdUseCase;
  // private updateClienteUseCase: UpdateClienteUseCase;
  // private getAllClienteUseCase: GetAllClienteUseCase;
  // private deleteClienteUseCase: DeleteClienteUseCase;

  constructor(readonly usuarioRepository: UsuarioRepository) {
    this.registerUsuarioUseCase = new RegisterUsuarioUseCase(usuarioRepository);
    this.getUsuarioByEmailUseCase = new GetUsuarioByEmailUseCase(
      usuarioRepository
    );
    this.getActivedUsuarioByEmailUseCase = new GetactivedUsuarioByEmailUseCase(
      usuarioRepository
    );
    this.getUsuarioByIdUseCase = new GetUsuarioByIdUseCase(usuarioRepository);
    // this.updateClienteUseCase = new UpdateClienteUseCase(clienteRepository);
    // this.getAllClienteUseCase = new GetAllClienteUseCase(clienteRepository);
    // this.deleteClienteUseCase = new DeleteClienteUseCase(clienteRepository);
  }

  public async create(usuario: UsuarioInputDTO): Promise<Response> {
    try {
      const result = await this.registerUsuarioUseCase.execute(usuario);
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Usuario>(result.value.getValue() as Usuario));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async getByEmail(email: string): Promise<Response> {
    try {
      const result = await this.getUsuarioByEmailUseCase.execute(email);

      if (result.isLeft()) {
        return left(result.value);
      } else {
        const usuario = result.value.getValue();
        return right(Result.ok<Usuario>(usuario));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async getActivedByEmail(email: string): Promise<Response> {
    try {
      const result = await this.getActivedUsuarioByEmailUseCase.execute(email);

      if (result.isLeft()) {
        return left(result.value);
      } else {
        const usuario = result.value.getValue();
        return right(Result.ok<Usuario>(usuario));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async getById(id: string): Promise<Response> {
    try {
      const result = await this.getUsuarioByIdUseCase.execute(id);

      if (result.isLeft()) {
        return left(result.value);
      } else {
        const usuario = result.value.getValue();
        return right(Result.ok<Usuario>(usuario));
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
