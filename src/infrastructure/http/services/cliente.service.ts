import { CreateClienteUseCase } from "../../../application/useCases/createCliente/createCliente.useCase";
import { GetAllClienteUseCase } from "../../../application/useCases/getAllCliente/getAllCliente.usecase";
import { UseCaseError } from "../../../core/domain/useCaseError";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";

type Response = Either<AppError.UnexpectedError, Result<Cliente[]> | Result<Cliente>>;

export class ClienteService {
  private createClienteUseCase: CreateClienteUseCase;
  private getAllClienteUseCase: GetAllClienteUseCase;
  constructor(readonly clienteRepository: ClienteRepository) {
    this.createClienteUseCase = new CreateClienteUseCase(clienteRepository);
    this.getAllClienteUseCase = new GetAllClienteUseCase(clienteRepository);
  }

  public async create(cliente: ClienteInputDTO): Promise<Response> {
    try {
      const result = await this.createClienteUseCase.execute(cliente);
      if(result.isLeft()) {
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

      if(result.isLeft()) {
        return left(result.value);
      } else {
        const clienteList = result.value.getValue();
        return right(Result.ok<Cliente[]>(clienteList));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
