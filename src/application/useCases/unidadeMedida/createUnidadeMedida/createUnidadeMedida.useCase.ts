import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { UnidadeMedidaInputDTO } from "../../../../domain/DTOS/unidadeMedida/unidadeMedida.dto";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaRepository } from "../../../../domain/repositories/unidadeMedida/unidadeMedida.repository";
import { CreateUnidadeMedidaErrors } from "./createUnidadeMedidaErrors";

type Response = Either<AppError.UnexpectedError, Result<UnidadeMedida>>;

export class CreateUnidadeMedidaUseCase
  implements UseCase<UnidadeMedidaInputDTO, Promise<Response>>
{
  constructor(private unidadeMedidaRepository: UnidadeMedidaRepository) {}

  async execute(input: UnidadeMedidaInputDTO): Promise<Response> {
    const unidadeMedida = UnidadeMedida.create({
      ...input
    });

    try {
      const unidadeMedidaExists = await this.unidadeMedidaRepository.exists(
        unidadeMedida.nome
      );

      if (unidadeMedidaExists) {
        return left(
          new CreateUnidadeMedidaErrors.UnidadeMedidaAlreadyExists(unidadeMedida.nome)
        );
      }

      await this.unidadeMedidaRepository.save(unidadeMedida);
      return right(Result.ok<UnidadeMedida>(unidadeMedida));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
