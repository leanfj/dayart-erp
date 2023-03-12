import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { MaterialRepository } from "../../../../domain/repositories/material/material.repository";
import { GetAllMaterialErrors } from "./getAllMaterialErrors";

type Response = Either<AppError.UnexpectedError, Result<Material[] | Material>>;

export class GetAllMaterialUseCase
  implements UseCase<MaterialInputDTO, Promise<Response>>
{
  constructor(private materialRepository: MaterialRepository) {}

  async execute(): Promise<Response> {
    try {
      const materialOrError = await this.materialRepository.findAll();
      if (materialOrError.isLeft()) {
        return left(new GetAllMaterialErrors.MaterialListEmpty());
      }

      return right(
        Result.ok<Material[] | Material>(materialOrError.value.getValue())
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
