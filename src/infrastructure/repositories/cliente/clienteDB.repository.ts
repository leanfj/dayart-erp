import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";
import { ClienteModel } from "../../database/models";
import { ClienteRepositoryErrors } from "./clienteRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<Cliente | Cliente[]>>;

export class ClienteDBRepository implements ClienteRepository {
  constructor() {}

  async findAll(): Promise<Cliente[]> {
    const result = await ClienteModel.findAll();
    return result.map((cliente) => {
      return Cliente.create(
        {
          nome: cliente.nome,
          email: cliente.email,
          genero: cliente.genero,
          telefone: cliente.telefone,
          endereco: cliente.endereco,
          cidade: cliente.cidade,
          estado: cliente.estado,
        },
        new UniqueEntityID(cliente.id)
      );
    });
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const clienteData = await ClienteModel.findByPk(id.toString());

      if (!clienteData) {
        return left(new ClienteRepositoryErrors.ClienteNotExists());
      }

      const cliente = Cliente.create({
        nome: clienteData.nome,
        email: clienteData.email,
        genero: clienteData.genero,
        telefone: clienteData.telefone,
        endereco: clienteData.endereco,
        cidade: clienteData.cidade,
        estado: clienteData.estado,
      });

      return right(Result.ok<Cliente>(cliente));

      return;
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(nome: string): Promise<boolean> {
    const cliente = await ClienteModel.findOne({
      where: {
        nome: nome,
      },
    });

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

    await ClienteModel.create({
      id: newCliente.id.toString(),
      nome: newCliente.nome,
      email: newCliente.email,
      genero: newCliente.genero,
      telefone: newCliente.telefone,
      endereco: newCliente.endereco,
      cidade: newCliente.cidade,
      estado: newCliente.estado,
      dataCadastro: newCliente.dataCadastro,
    });
  }

  async update(id: UniqueEntityID, input: any): Promise<Cliente> {
    const clienteData = this.findById(id);

    if (!clienteData) {
      throw new Error("Cliente não encontrado");
    }

    await ClienteModel.update(
      {
        id: id.toString(),
        nome: input.nome,
        email: input.email,
        genero: input.genero,
        telefone: input.telefone,
        endereco: input.endereco,
        cidade: input.cidade,
        estado: input.estado,
      },
      {
        where: {
          id: id.toString(),
        },
      }
    );

    return Cliente.create({
      nome: input.nome,
      email: input.email,
      genero: input.genero,
      telefone: input.telefone,
      endereco: input.endereco,
      cidade: input.cidade,
      estado: input.estado,
    });
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const clienteData = await ClienteModel.findByPk(id.toString());

      if (!clienteData) {
        return left(new ClienteRepositoryErrors.ClienteNotExists());
      }
      await ClienteModel.destroy({
        where: {
          id: id.toString(),
        },
      });

      return right(Result.ok<Cliente>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
