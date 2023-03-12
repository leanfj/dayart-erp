import { CreateMaterialUseCase } from "../../../../application/useCases/material/createMaterial/createMaterial.useCase";
import { DeleteMaterialUseCase } from "../../../../application/useCases/material/deleteMaterial/deleteMaterial.useCase";
import { GetAllMaterialUseCase } from "../../../../application/useCases/material/getAllMaterial/getAllMaterial.usecase";
import { UpdateMaterialUseCase } from "../../../../application/useCases/material/updateMaterial/updateMaterial.useCase";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { validatorDTO } from "../../../../core/domain/validatorDTO";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { MaterialRepository } from "../../../../domain/repositories/material/material.repository";

type Response = Either<AppError.UnexpectedError, Result<Material[] | Material>>;

export class MaterialService {
  private createMaterialUseCase: CreateMaterialUseCase;
  private updateMaterialUseCase: UpdateMaterialUseCase;
  private getAllMaterialUseCase: GetAllMaterialUseCase;
  private deleteMaterialUseCase: DeleteMaterialUseCase;

  constructor(readonly materialRepository: MaterialRepository) {
    this.createMaterialUseCase = new CreateMaterialUseCase(materialRepository);
    this.updateMaterialUseCase = new UpdateMaterialUseCase(materialRepository);
    this.getAllMaterialUseCase = new GetAllMaterialUseCase(materialRepository);
    this.deleteMaterialUseCase = new DeleteMaterialUseCase(materialRepository);
  }

  public async create(material: MaterialInputDTO): Promise<Response> {
    try {
      const validOrError = await validatorDTO(MaterialInputDTO, material, {});
      if (validOrError.isLeft()) {
        return left(validOrError.value);
      }
      const result = await this.createMaterialUseCase.execute(material);
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Material>(result.value.getValue() as Material));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async getAll(): Promise<Response> {
    try {
      const result = await this.getAllMaterialUseCase.execute();

      if (result.isLeft()) {
        return left(result.value);
      } else {
        const materialList = result.value.getValue();
        return right(Result.ok<Material[] | Material>(materialList));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async update(
    material: MaterialInputDTO,
    id: UniqueEntityID
  ): Promise<Response> {
    try {
      const validOrError = await validatorDTO(MaterialInputDTO, material, {skipMissingProperties: true});
      if (validOrError.isLeft()) {
        return left(validOrError.value);
      }
      const result = await this.updateMaterialUseCase.execute({
        props: validOrError.value.getValue(),
        id: id.toString(),
      });

      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Material>(result.value.getValue()));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const result = await this.deleteMaterialUseCase.execute(id);
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Material>(result.value.getValue()));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
