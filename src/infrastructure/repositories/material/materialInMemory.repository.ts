import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Material } from "../../../domain/entities/material/material.entity";
import { MaterialRepository } from "../../../domain/repositories/material/material.repository";
import { MaterialRepositoryErrors } from "./materialRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<Material | Material[]>>;

export class MaterialInMemoryRepository implements MaterialRepository {
  private materials: Material[] = [];

  async findAll(): Promise<Response> {
    try {
      const materialData = this.materials;
      if (materialData.length === 0) {
        return left(new MaterialRepositoryErrors.MaterialListEmpty());
      }

      const materials = materialData.map((material) => {
        return Material.create(
          {
            titulo: material.titulo,
            descricao: material.descricao,
            valor: material.valor,
            unidadeMedida: material.unidadeMedida,
            quantidade: material.quantidade,
            valorUnitario: material.valorUnitario,
          },
          new UniqueEntityID(material.id.toString())
        );
      });

      return right(Result.ok<Material[]>(materials));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const materialData = this.materials.find((material) => material.id.toString() === id.toString());
      if (!materialData) {
        return left(new MaterialRepositoryErrors.MaterialNotExists());
      }
      return right(Result.ok<Material>(materialData));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(titulo: string): Promise<boolean> {
    const material = this.materials.find((material) => material.titulo === titulo);

    if (!material) {
      return false;
    }

    return true;
  }

  async save(input: Material): Promise<Response> {
    try {
      const newMaterial = Material.create({
        titulo: input.titulo,
        descricao: input.descricao,
        valor: input.valor,
        unidadeMedida: input.unidadeMedida,
        quantidade: input.quantidade,
        valorUnitario: input.valorUnitario,
      }, new UniqueEntityID(input.id.toString()));

      this.materials.push(newMaterial);
      return right(Result.ok<Material>(newMaterial));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: UniqueEntityID, input: any): Promise<Response> {
    try {
      const index = this.materials.findIndex((material) => material.id.toString() === id.toString());
      if (index === -1) {
        return left(new MaterialRepositoryErrors.MaterialNotExists());
      }
      this.materials[index] = input;
      return right(Result.ok<Material>(this.materials[index]));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const index = this.materials.findIndex((material) => material.id.toString() === id.toString());
      if (index === -1) {
        return left(new MaterialRepositoryErrors.MaterialNotExists());
      }
      this.materials.splice(index, 1);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
