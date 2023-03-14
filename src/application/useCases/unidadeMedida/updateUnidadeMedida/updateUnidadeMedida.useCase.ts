import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { UnidadeMedidaInputDTO } from "../../../../domain/DTOS/unidadeMedida/unidadeMedida.dto";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaRepository } from "../../../../domain/repositories/unidadeMedida/unidadeMedida.repository";
import { UpdateUnidadeMedidaErrors } from "./updateUnidadeMedidaErrors";

type Response = Either<AppError.UnexpectedError, Result<UnidadeMedida>>;
type Request = {id: string, props: UnidadeMedidaInputDTO};
export class UpdateUnidadeMedidaUseCase
  implements UseCase<Request, Promise<Response>>
{
  constructor(private unidadeMedidaRepository: UnidadeMedidaRepository) {}

  async execute(input: Request): Promise<Response> {
    try {
      const unidadeMedidaData = await this.unidadeMedidaRepository.findById(
        input.id
      );

      if (unidadeMedidaData.isLeft()) {
        return left(
          new UpdateUnidadeMedidaErrors.UnidadeMedidaNotExists()
        );
      }

      await this.unidadeMedidaRepository.update(input.id, input.props);
      
      return right(Result.ok<UnidadeMedida>(unidadeMedidaData.value.getValue() as UnidadeMedida));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
