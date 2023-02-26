import { UseCase } from "../../../core/application/useCase";
import { Result } from "../../../core/logic/result";
import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";

export class GetAllClienteUseCase
  implements UseCase<ClienteInputDTO, Result<Cliente[]>>
{
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(): Promise<Result<Cliente[]>> {
    try {
      const clienteList = await this.clienteRepository.findAll();
      throw new Error("Teste");
      return Result.ok<Cliente[]>(clienteList);
    } catch (error) {
      return Result.fail(error);
    }
  }
}
