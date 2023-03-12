import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { MaterialRepository } from "../../../../domain/repositories/material/material.repository";
import { CreateMaterialErrors } from "./createMaterialErrors";

type Response = Either<AppError.UnexpectedError, Result<Material>>;

export class CreateMaterialUseCase
  implements UseCase<MaterialInputDTO, Promise<Response>>
{
  constructor(private materialRepository: MaterialRepository) {}

  async execute(input: MaterialInputDTO): Promise<Response> {
    const material = Material.create({
      ...input
    });

    try {
      const materialExists = await this.materialRepository.exists(
        material.titulo
      );

      if (materialExists) {
        return left(
          new CreateMaterialErrors.MaterialAlreadyExists(material.titulo)
        );
      }

      await this.materialRepository.save(material);
      return right(Result.ok<Material>(material));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
