import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { ClienteInputDTO } from "../../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../../domain/repositories/cliente/cliente.repository";
import { CreateClienteErrors } from "./createClienteErrors";

type Response = Either<AppError.UnexpectedError, Result<Cliente>>;

export class CreateClienteUseCase
  implements UseCase<ClienteInputDTO, Promise<Response>>
{
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(input: ClienteInputDTO): Promise<Response> {
    const cliente = Cliente.create({
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
    });

    try {
      const clienteExists = await this.clienteRepository.exists(
        cliente.props.nome
      );
      if (clienteExists) {
        return left(
          new CreateClienteErrors.ClienteAlreadyExists(cliente.props.nome)
        );
      }

      await this.clienteRepository.save(cliente);
      return right(Result.ok<Cliente>(cliente));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
