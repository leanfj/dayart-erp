import { UseCase } from "../../../core/application/useCase";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";
import { DeleteClienteErrors } from "./deleteClienteErrors";

type Response = Either<AppError.UnexpectedError, Result<Cliente>>;

export class DeleteClienteUseCase
  implements UseCase<UniqueEntityID , Promise<Response>>
{
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(id: UniqueEntityID): Promise<Response> {

    try {
      const clienteData = await this.clienteRepository.findById(
        id
      );

      if (clienteData.isLeft()) {
        return left(
          new DeleteClienteErrors.ClienteNotExists()
        );
      }

      await this.clienteRepository.delete(id);
      
      return right(Result.ok<Cliente>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
