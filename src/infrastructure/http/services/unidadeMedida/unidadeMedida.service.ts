import { CreateUnidadeMedidaUseCase } from "../../../../application/useCases/unidadeMedida/createUnidadeMedida/createUnidadeMedida.useCase";
import { DeleteUnidadeMedidaUseCase } from "../../../../application/useCases/unidadeMedida/deleteUnidadeMedida/deleteUnidadeMedida.useCase";
import { GetAllUnidadeMedidaUseCase } from "../../../../application/useCases/unidadeMedida/getAllUnidadeMedida/getAllUnidadeMedida.usecase";
import { UpdateUnidadeMedidaUseCase } from "../../../../application/useCases/unidadeMedida/updateUnidadeMedida/updateUnidadeMedida.useCase";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { validatorDTO } from "../../../../core/domain/validatorDTO";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { UnidadeMedidaInputDTO } from "../../../../domain/DTOS/unidadeMedida/unidadeMedida.dto";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaRepository } from "../../../../domain/repositories/unidadeMedida/unidadeMedida.repository";

type Response = Either<AppError.UnexpectedError, Result<UnidadeMedida[] | UnidadeMedida>>;

export class UnidadeMedidaService {
  private createUnidadeMedidaUseCase: CreateUnidadeMedidaUseCase;
  private updateUnidadeMedidaUseCase: UpdateUnidadeMedidaUseCase;
  private getAllUnidadeMedidaUseCase: GetAllUnidadeMedidaUseCase;
  private deleteUnidadeMedidaUseCase: DeleteUnidadeMedidaUseCase;

  constructor(readonly unidadeMedidaRepository: UnidadeMedidaRepository) {
    this.createUnidadeMedidaUseCase = new CreateUnidadeMedidaUseCase(unidadeMedidaRepository);
    this.updateUnidadeMedidaUseCase = new UpdateUnidadeMedidaUseCase(unidadeMedidaRepository);
    this.getAllUnidadeMedidaUseCase = new GetAllUnidadeMedidaUseCase(unidadeMedidaRepository);
    this.deleteUnidadeMedidaUseCase = new DeleteUnidadeMedidaUseCase(unidadeMedidaRepository);
  }

  public async create(unidadeMedida: UnidadeMedidaInputDTO): Promise<Response> {
    try {
      const validOrError = await validatorDTO(UnidadeMedidaInputDTO, unidadeMedida, {});
      if (validOrError.isLeft()) {
        return left(validOrError.value);
      }
      const result = await this.createUnidadeMedidaUseCase.execute(unidadeMedida);
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<UnidadeMedida>(result.value.getValue() as UnidadeMedida));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async getAll(): Promise<Response> {
    try {
      const result = await this.getAllUnidadeMedidaUseCase.execute();

      if (result.isLeft()) {
        return left(result.value);
      } else {
        const unidadeMedidaList = result.value.getValue();
        return right(Result.ok<UnidadeMedida[] | UnidadeMedida>(unidadeMedidaList));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async update(
    unidadeMedida: UnidadeMedidaInputDTO,
    id: UniqueEntityID
  ): Promise<Response> {
    try {
      const validOrError = await validatorDTO(UnidadeMedidaInputDTO, unidadeMedida, {skipMissingProperties: true});
      if (validOrError.isLeft()) {
        return left(validOrError.value);
      }
      const result = await this.updateUnidadeMedidaUseCase.execute({
        props: validOrError.value.getValue(),
        id: id.toString(),
      });

      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<UnidadeMedida>(result.value.getValue()));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const result = await this.deleteUnidadeMedidaUseCase.execute(id);
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<UnidadeMedida>(result.value.getValue()));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
