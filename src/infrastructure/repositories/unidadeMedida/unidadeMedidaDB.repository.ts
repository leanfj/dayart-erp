import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { UnidadeMedida } from "../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaMapper } from "../../../domain/mappers/unidadeMedida/unidadeMedida.mapper";
import { UnidadeMedidaRepository } from "../../../domain/repositories/unidadeMedida/unidadeMedida.repository";
import { UnidadeMedidaModel } from "../../database/models";
import { UnidadeMedidaRepositoryErrors } from "./unidadeMedidaRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<UnidadeMedida | UnidadeMedida[]>>;

export class UnidadeMedidaDBRepository implements UnidadeMedidaRepository {
  constructor() {}

  async findAll(): Promise<Response> {
    try {
      const unidadeMedidaData = await UnidadeMedidaModel.findAll({
        raw: true,
      });
      if (unidadeMedidaData.length === 0) {
        return left(new UnidadeMedidaRepositoryErrors.UnidadeMedidaListEmpty());
      }

      const unidadeMedidas = unidadeMedidaData.map((unidadeMedida) => {
        return UnidadeMedidaMapper.toDomain(unidadeMedida);
      });

      return right(Result.ok<UnidadeMedida[]>(unidadeMedidas));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const unidadeMedidaData = await UnidadeMedidaModel.findByPk(id.toString());

      if (!unidadeMedidaData) {
        return left(new UnidadeMedidaRepositoryErrors.UnidadeMedidaNotExists());
      }

      const unidadeMedida = UnidadeMedidaMapper.toDomain(unidadeMedidaData);

      return right(Result.ok<UnidadeMedida>(unidadeMedida));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(nome: string): Promise<boolean> {
    const unidadeMedida = await UnidadeMedidaModel.findOne({
      where: {
        nome: nome,
      },
    });

    if (!unidadeMedida) {
      return false;
    }

    return true;
  }

  async save(unidadeMedida: UnidadeMedida): Promise<Response> {
    try {
      const unidadeMedidaCreated = await UnidadeMedidaModel.create({
        ...UnidadeMedidaMapper.toPersistence(unidadeMedida),
        dataCadastro: new Date(),
      });

      return right(Result.ok<UnidadeMedida>(UnidadeMedidaMapper.toDomain(unidadeMedidaCreated)));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: string, input: any): Promise<Response> {
    try {
      const unidadeMedidaData = await this.findById(new UniqueEntityID(id));

      if (!unidadeMedidaData) {
        return left(new UnidadeMedidaRepositoryErrors.UnidadeMedidaNotExists());
      }

      const dataToUpdate = {
        ...input,
        dataAtualizacao: new Date(),
      };

      const updatedUnidadeMedida = await UnidadeMedidaModel.update(dataToUpdate, {
        where: {
          id: id.toString(),
        },
        returning: true,
      });

      return right(
        Result.ok<UnidadeMedida>(
          UnidadeMedidaMapper.toDomain(updatedUnidadeMedida[1][0].dataValues)
        )
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const unidadeMedidaData = await UnidadeMedidaModel.findByPk(id.toString());

      if (!unidadeMedidaData) {
        return left(new UnidadeMedidaRepositoryErrors.UnidadeMedidaNotExists());
      }
      await UnidadeMedidaModel.destroy({
        where: {
          id: id.toString(),
        },
      });

      return right(Result.ok<UnidadeMedida>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
