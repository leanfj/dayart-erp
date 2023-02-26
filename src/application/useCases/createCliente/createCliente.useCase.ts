import { UseCase } from "../../../core/application/useCase";
import { Either, Result, left, right } from "../../../core/logic/result";
import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";
import { CreateClienteErrors } from "./createClienteErrors";

type Response = Either<
  CreateClienteErrors.ClienteAlreadyExists | Result<any>,
  Result<void>
>;

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
    });

    const clienteExists = await this.clienteRepository.exists(
      cliente.props.nome
    );

    if (clienteExists) {
      return left(
        new CreateClienteErrors.ClienteAlreadyExists(cliente.props.nome)
      ) as Response;
    }

    try {
      await this.clienteRepository.save(cliente);
    } catch (error) {
      return left(Result.fail(error)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}
