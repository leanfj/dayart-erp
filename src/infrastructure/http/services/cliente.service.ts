import { CreateClienteUseCase } from "../../../application/useCases/createCliente/createCliente.useCase";
import { GetAllClienteUseCase } from "../../../application/useCases/getAllCliente/getAllCliente.usecase";
import { Result } from "../../../core/logic/result";
import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";

export class ClienteService {
  private createClienteUseCase: CreateClienteUseCase
  private getAllClienteUseCase: GetAllClienteUseCase
  constructor(readonly clienteRepository: ClienteRepository) {
    this.createClienteUseCase = new CreateClienteUseCase(clienteRepository);
    this.getAllClienteUseCase = new GetAllClienteUseCase(clienteRepository);
  }

  public async create(cliente: ClienteInputDTO) {
    const result = await this.createClienteUseCase.execute(cliente);
    return { result };
  }

  public async getAll(): Promise<Result<Cliente[]>> {
    try {
      const result = await this.getAllClienteUseCase.execute();
      return Result.ok<Cliente[]>(result.getValue());
      
    } catch (error) {
      return Result.fail(error);
      
    }
  }
}
