import { CreateClienteUseCase } from "../../../application/useCases/createCliente/createCliente.useCase";
import { DeleteClienteUseCase } from "../../../application/useCases/deleteCliente/deleteCliente.useCase";
import { GetAllClienteUseCase } from "../../../application/useCases/getAllCliente/getAllCliente.usecase";
import { UpdateClienteUseCase } from "../../../application/useCases/updateCliente/updateCliente.useCase";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { validatorDto } from "../../../core/domain/validatorDTO";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";

type Response = Either<AppError.UnexpectedError, Result<Cliente[] | Cliente>>;

export class ClienteService {
  private createClienteUseCase: CreateClienteUseCase;
  private updateClienteUseCase: UpdateClienteUseCase;
  private getAllClienteUseCase: GetAllClienteUseCase;
  private deleteClienteUseCase: DeleteClienteUseCase;

  constructor(readonly clienteRepository: ClienteRepository) {
    this.createClienteUseCase = new CreateClienteUseCase(clienteRepository);
    this.updateClienteUseCase = new UpdateClienteUseCase(clienteRepository);
    this.getAllClienteUseCase = new GetAllClienteUseCase(clienteRepository);
    this.deleteClienteUseCase = new DeleteClienteUseCase(clienteRepository);
  }

  public async create(cliente: ClienteInputDTO): Promise<Response> {
    try {
      const validOrError = await validatorDto(ClienteInputDTO, cliente);
      if (validOrError.isLeft()) {
        return left(validOrError.value);
      }
      const result = await this.createClienteUseCase.execute(cliente);
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Cliente>(result.value.getValue() as Cliente));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async getAll(): Promise<Response> {
    try {
      const result = await this.getAllClienteUseCase.execute();

      if (result.isLeft()) {
        return left(result.value);
      } else {
        const clienteList = result.value.getValue();
        return right(Result.ok<Cliente[] | Cliente>(clienteList));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async update(
    cliente: ClienteInputDTO,
    id: UniqueEntityID
  ): Promise<Response> {
    try {
      const validOrError = await validatorDto(ClienteInputDTO, cliente);
      if (validOrError.isLeft()) {
        return left(validOrError.value);
      }
      const result = await this.updateClienteUseCase.execute({
        ...cliente,
        id: id.toString(),
      });
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Cliente>(result.value.getValue()));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const result = await this.deleteClienteUseCase.execute(id);
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Cliente>(result.value.getValue()));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
