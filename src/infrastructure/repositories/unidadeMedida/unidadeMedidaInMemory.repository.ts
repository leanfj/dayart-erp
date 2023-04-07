import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { UnidadeMedida } from "../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaRepository } from "../../../domain/repositories/unidadeMedida/unidadeMedida.repository";
import { UnidadeMedidaRepositoryErrors } from "./unidadeMedidaRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<UnidadeMedida | UnidadeMedida[]>>;

export class UnidadeMedidaInMemoryRepository implements UnidadeMedidaRepository {
  private unidadeMedidas: UnidadeMedida[] = [];

  async findAll(): Promise<Response> {
    try {
      const unidadeMedidaData = this.unidadeMedidas;
      if (unidadeMedidaData.length === 0) {
        return left(new UnidadeMedidaRepositoryErrors.UnidadeMedidaListEmpty());
      }

      const unidadeMedidas = unidadeMedidaData.map((unidadeMedida) => {
        return UnidadeMedida.create(
          {
            nome: unidadeMedida.nome,
            nomenclatura: unidadeMedida.nomenclatura,
            categoria: unidadeMedida.categoria,
          },
          new UniqueEntityID(unidadeMedida.id.toString())
        );
      });

      return right(Result.ok<UnidadeMedida[]>(unidadeMedidas));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const unidadeMedidaData = this.unidadeMedidas.find((unidadeMedida) => unidadeMedida.id.toString() === id.toString());
      if (!unidadeMedidaData) {
        return left(new UnidadeMedidaRepositoryErrors.UnidadeMedidaNotExists());
      }
      return right(Result.ok<UnidadeMedida>(unidadeMedidaData));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(nome: string): Promise<boolean> {
    const unidadeMedida = this.unidadeMedidas.find((unidadeMedida) => unidadeMedida.nome === nome);

    if (!unidadeMedida) {
      return false;
    }

    return true;
  }

  async save(input: UnidadeMedida): Promise<Response> {
    try {
      const newUnidadeMedida = UnidadeMedida.create({
        nome: input.nome,
        nomenclatura: input.nomenclatura,
        categoria: input.categoria,
      }, new UniqueEntityID(input.id.toString()));

      this.unidadeMedidas.push(newUnidadeMedida);
      return right(Result.ok<UnidadeMedida>(newUnidadeMedida));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: UniqueEntityID, input: any): Promise<Response> {
    try {
      const index = this.unidadeMedidas.findIndex((unidadeMedida) => unidadeMedida.id.toString() === id.toString());
      if (index === -1) {
        return left(new UnidadeMedidaRepositoryErrors.UnidadeMedidaNotExists());
      }
      this.unidadeMedidas[index] = input;
      return right(Result.ok<UnidadeMedida>(this.unidadeMedidas[index]));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const index = this.unidadeMedidas.findIndex((unidadeMedida) => unidadeMedida.id.toString() === id.toString());
      if (index === -1) {
        return left(new UnidadeMedidaRepositoryErrors.UnidadeMedidaNotExists());
      }
      this.unidadeMedidas.splice(index, 1);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
