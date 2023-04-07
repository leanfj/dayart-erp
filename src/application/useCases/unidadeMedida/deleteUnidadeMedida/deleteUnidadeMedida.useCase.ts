import { UseCase } from "../../../../core/application/useCase";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaRepository } from "../../../../domain/repositories/unidadeMedida/unidadeMedida.repository";
import { DeleteUnidadeMedidaErrors } from "./deleteUnidadeMedidaErrors";

type Response = Either<AppError.UnexpectedError, Result<UnidadeMedida>>;

export class DeleteUnidadeMedidaUseCase
  implements UseCase<UniqueEntityID , Promise<Response>>
{
  constructor(private unidadeMedidaRepository: UnidadeMedidaRepository) {}

  async execute(id: UniqueEntityID): Promise<Response> {

    try {
      const unidadeMedidaData = await this.unidadeMedidaRepository.findById(
        id
      );

      if (unidadeMedidaData.isLeft()) {
        return left(
          new DeleteUnidadeMedidaErrors.UnidadeMedidaNotExists()
        );
      }

      await this.unidadeMedidaRepository.delete(id);
      
      return right(Result.ok<UnidadeMedida>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
