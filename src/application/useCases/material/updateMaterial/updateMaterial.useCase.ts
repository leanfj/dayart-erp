import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { MaterialRepository } from "../../../../domain/repositories/material/material.repository";
import { UpdateMaterialErrors } from "./updateMaterialErrors";

type Response = Either<AppError.UnexpectedError, Result<Material>>;
type Request = {id: string, props: MaterialInputDTO};
export class UpdateMaterialUseCase
  implements UseCase<Request, Promise<Response>>
{
  constructor(private materialRepository: MaterialRepository) {}

  async execute(input: Request): Promise<Response> {
    try {
      const materialData = await this.materialRepository.findById(
        input.id
      );

      if (materialData.isLeft()) {
        return left(
          new UpdateMaterialErrors.MaterialNotExists()
        );
      }

      await this.materialRepository.update(input.id, input.props);
      
      return right(Result.ok<Material>(materialData.value.getValue() as Material));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
