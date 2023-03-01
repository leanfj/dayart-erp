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

  async findAll(): Promise<Response> {
    try {
      const clienteData = await ClienteModel.findAll();
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
          new UniqueEntityID(cliente.id)
        );
      });

      return right(Result.ok<Cliente[]>(clientes));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
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
        cep: clienteData.cep,
        cpf: clienteData.cpf,
        dataEvento: clienteData.dataEvento,
      });

      return right(Result.ok<Cliente>(cliente));
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

      const clienteData = await ClienteModel.create({
        id: newCliente.id.toString(),
        nome: newCliente.nome,
        email: newCliente.email,
        genero: newCliente.genero,
        telefone: newCliente.telefone,
        endereco: newCliente.endereco,
        cidade: newCliente.cidade,
        estado: newCliente.estado,
        cep: newCliente.cep,
        cpf: newCliente.cpf,
        dataEvento: newCliente.dataEvento,
        dataCadastro: newCliente.dataCadastro,
      });

      if (!clienteData) {
        return left(new ClienteRepositoryErrors.ClienteNotExists());
      }

      return right(Result.ok<Cliente>(newCliente));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: UniqueEntityID, input: any): Promise<Response> {
    try {
      const clienteData = await this.findById(id);

      if (!clienteData) {
        return left(new ClienteRepositoryErrors.ClienteNotExists());
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

      return right(
        Result.ok<Cliente>(
          Cliente.create({
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
          })
        )
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
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
