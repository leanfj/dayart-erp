import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { UnidadeMedidaInputDTO } from "../../../../domain/DTOS/unidadeMedida/unidadeMedida.dto";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaRepository } from "../../../../domain/repositories/unidadeMedida/unidadeMedida.repository";
import { GetAllUnidadeMedidaErrors } from "./getAllUnidadeMedidaErrors";

type Response = Either<AppError.UnexpectedError, Result<UnidadeMedida[] | UnidadeMedida>>;

export class GetAllUnidadeMedidaUseCase
  implements UseCase<UnidadeMedidaInputDTO, Promise<Response>>
{
  constructor(private unidadeMedidaRepository: UnidadeMedidaRepository) {}

  async execute(): Promise<Response> {
    try {
      const unidadeMedidaOrError = await this.unidadeMedidaRepository.findAll();
      if (unidadeMedidaOrError.isLeft()) {
        return left(new GetAllUnidadeMedidaErrors.UnidadeMedidaListEmpty());
      }

      return right(
        Result.ok<UnidadeMedida[] | UnidadeMedida>(unidadeMedidaOrError.value.getValue())
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
