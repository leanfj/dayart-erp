import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { ClienteInputDTO } from "../../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../../domain/repositories/cliente/cliente.repository";
import { UpdateClienteErrors } from "./updateClienteErrors";

type Response = Either<AppError.UnexpectedError, Result<Cliente>>;

export class UpdateClienteUseCase
  implements UseCase<ClienteInputDTO, Promise<Response>>
{
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(input: ClienteInputDTO): Promise<Response> {
    const newCliente = Cliente.create({
      nome: input.nome,
      email: input.email,
      genero: input.genero,
      telefone: input.telefone,
      endereco: input.endereco,
      cidade: input.cidade,
      estado: input.estado,
      cep: input.cep,
      cpf: input.cpf,
      dataEvento: input.dataEvento,
    }, new UniqueEntityID(input.id.toString()));

    try {
      const clienteData = await this.clienteRepository.findById(
        input.id
      );

      if (clienteData.isLeft()) {
        return left(
          new UpdateClienteErrors.ClienteNotExists()
        );
      }

      const updateOrError = await this.clienteRepository.update(input.id, newCliente);
      
      return right(Result.ok<Cliente>(updateOrError.value.getValue() as Cliente));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
