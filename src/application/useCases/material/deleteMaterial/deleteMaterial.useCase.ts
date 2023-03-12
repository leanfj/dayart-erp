import { UseCase } from "../../../../core/application/useCase";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { Material } from "../../../../domain/entities/material/material.entity";
import { MaterialRepository } from "../../../../domain/repositories/material/material.repository";
import { DeleteMaterialErrors } from "./deleteMaterialErrors";

type Response = Either<AppError.UnexpectedError, Result<Material>>;

export class DeleteMaterialUseCase
  implements UseCase<UniqueEntityID , Promise<Response>>
{
  constructor(private materialRepository: MaterialRepository) {}

  async execute(id: UniqueEntityID): Promise<Response> {

    try {
      const materialData = await this.materialRepository.findById(
        id
      );

      if (materialData.isLeft()) {
        return left(
          new DeleteMaterialErrors.MaterialNotExists()
        );
      }

      await this.materialRepository.delete(id);
      
      return right(Result.ok<Material>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
