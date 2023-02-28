import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";
import { ClienteRepositoryErrors } from "./clienteRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<Cliente | Cliente[]>>;

export class ClienteInMemoryRepository implements ClienteRepository {
  private clientes: Cliente[] = [];

  async findAll(): Promise<Cliente[]> {
    return this.clientes;
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const clienteData = this.clientes.find((cliente) => cliente.id === id);
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
  async save(cliente: Cliente): Promise<void> {
    const newCliente = Cliente.create(
      {
        nome: cliente.nome,
        email: cliente.email,
        genero: cliente.genero,
        telefone: cliente.telefone,
        endereco: cliente.endereco,
        cidade: cliente.cidade,
        estado: cliente.estado,
        dataCadastro: cliente.dataCadastro || new Date(),
      },
      cliente.id
    );

    this.clientes.push(newCliente);
  }

  async update(id: UniqueEntityID, input: any): Promise<Cliente> {
    const index = this.clientes.findIndex((cliente) => cliente.id === id);

    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }

    const cliente = this.clientes[index];

    this.clientes[index] = { ...cliente, ...input };

    return this.clientes[index];
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const index = this.clientes.findIndex((cliente) => cliente.id === id);
      if (index === -1) {
        return left(new ClienteRepositoryErrors.ClienteNotExists());
      }
      this.clientes.splice(index, 1);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
