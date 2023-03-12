import { MaterialInputDTO } from "../../../domain/DTOS/material/material.dto";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Material } from "../../entities/material/material.entity";


type Response = Either<AppError.UnexpectedError, Result<Material | Material[]>>;

export interface MaterialRepository {
  findAll(): Promise<Response>;
  findById(id: string | UniqueEntityID): Promise<Response>;
  exists(id: string): Promise<boolean>;
  save(material: Material): Promise<Response>;
  update(id: string | UniqueEntityID, input: MaterialInputDTO): Promise<Response>;
  delete(id: string | UniqueEntityID): Promise<Response>;
}
