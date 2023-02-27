import { UseCase } from "../../../core/application/useCase";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";
import { GetAllClienteErrors } from "./getAllClienteErrors";

type Response = Either<AppError.UnexpectedError, Result<Cliente[]>>;
export class GetAllClienteUseCase
  implements UseCase<ClienteInputDTO, Promise<Response>>
{
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(): Promise<Response> {
    try {
      const clienteList = await this.clienteRepository.findAll();
      if(clienteList.length === 0) {
        return left(new GetAllClienteErrors.ClienteListEmpty());
      }
      return right(Result.ok<Cliente[]>(clienteList));
    } catch (error) {
      return left(new AppError.UnexpectedError(error))
    }
  }
}
