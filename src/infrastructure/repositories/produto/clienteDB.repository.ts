import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Cliente } from "../../../domain/entities/cliente/cliente.entity";
import { ClienteMapper } from "../../../domain/mappers/cliente/cliente.mapper";
import { ClienteRepository } from "../../../domain/repositories/cliente/cliente.repository";
import { ClienteModel } from "../../database/models";
import { ProdutoRepositoryErrors } from "./produtoRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<Cliente | Cliente[]>>;

export class ClienteDBRepository implements ClienteRepository {
  constructor() {}

  async findAll(): Promise<Response> {
    try {
      const clienteData = await ClienteModel.findAll();
      if (clienteData.length === 0) {
        return left(new ProdutoRepositoryErrors.ClienteListEmpty());
      }

      const clientes = clienteData.map((cliente) => {
        return ClienteMapper.toDomain(cliente);
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
        return left(new ProdutoRepositoryErrors.ProdutoNotExists());
      }

      const cliente = ClienteMapper.toDomain(clienteData);

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
      const newCliente = ClienteMapper.toDomain(cliente);

      await ClienteModel.create({
        ...ClienteMapper.toPersistence(newCliente),
        dataCadastro: new Date(),
      });

      return right(Result.ok<Cliente>(newCliente));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: UniqueEntityID, input: any): Promise<Response> {
    try {
      const clienteData = await this.findById(id);

      if (!clienteData) {
        return left(new ProdutoRepositoryErrors.ProdutoNotExists());
      }

      await ClienteModel.update(ClienteMapper.toPersistence(input), {
        where: {
          id: id.toString(),
        },
      });

      return right(Result.ok<Cliente>(ClienteMapper.toDomain(input)));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const clienteData = await ClienteModel.findByPk(id.toString());

      if (!clienteData) {
        return left(new ProdutoRepositoryErrors.ProdutoNotExists());
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
