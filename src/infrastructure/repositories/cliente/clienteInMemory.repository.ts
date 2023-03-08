import { ClienteMapper } from "../../../domain/mappers/cliente/cliente.mapper";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";
import { ClienteRepositoryErrors } from "./clienteRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<Cliente | Cliente[]>>;

export class ClienteInMemoryRepository implements ClienteRepository {
  private clientes: Cliente[] = [];

  async findAll(): Promise<Response> {
    try {
      const clienteData = this.clientes;
      if (clienteData.length === 0) {
        return left(new ClienteRepositoryErrors.ClienteListEmpty());
      }

      const clientes = clienteData.map((cliente) => {
        return Cliente.create(
          {
            nome: cliente.nome,
            email: cliente.email,
            genero: cliente.genero,
            telefone: cliente.telefone,
            endereco: cliente.endereco,
            cidade: cliente.cidade,
            estado: cliente.estado,
            cep: cliente.cep,
            cpf: cliente.cpf,
            dataEvento: cliente.dataEvento,
          },
          new UniqueEntityID(cliente.id.toString())
        );
      });

      return right(Result.ok<Cliente[]>(clientes));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const clienteData = this.clientes.find(
        (cliente) => cliente.id.toString() === id.toString()
      );
      if (!clienteData) {
        return left(new ClienteRepositoryErrors.ClienteNotExists());
      }
      return right(Result.ok<Cliente>(clienteData));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(nome: string): Promise<boolean> {
    const cliente = this.clientes.find((cliente) => cliente.nome === nome);

    if (!cliente) {
      return false;
    }

    return true;
  }
  async save(cliente: Cliente): Promise<Response> {
    try {
      const newCliente = Cliente.create(
        {
          nome: cliente.nome,
          email: cliente.email,
          genero: cliente.genero,
          telefone: cliente.telefone,
          endereco: cliente.endereco,
          cidade: cliente.cidade,
          estado: cliente.estado,
          cep: cliente.cep,
          cpf: cliente.cpf,
          dataEvento: cliente.dataEvento,
          dataCadastro: cliente.dataCadastro || new Date(),
        },
        cliente.id
      );

      this.clientes.push(newCliente);
      return right(Result.ok<Cliente>(newCliente));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: UniqueEntityID, input: any): Promise<Response> {
    try {
      const index = this.clientes.findIndex(
        (cliente) => cliente.id.toString() === id.toString()
      );
      if (index === -1) {
        return left(new ClienteRepositoryErrors.ClienteNotExists());
      }
      this.clientes[index] = input;
      return right(
        Result.ok<Cliente>(ClienteMapper.toDomain(this.clientes[index]))
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const index = this.clientes.findIndex(
        (cliente) => cliente.id.toString() === id.toString()
      );
      if (index === -1) {
        return left(new ClienteRepositoryErrors.ClienteNotExists());
      }
      this.clientes.splice(index, 1);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
