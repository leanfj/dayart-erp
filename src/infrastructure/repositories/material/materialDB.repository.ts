import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Material } from "../../../domain/entities/material/material.entity";
import { MaterialMapper } from "../../../domain/mappers/material/material.mapper";
import { MaterialRepository } from "../../../domain/repositories/material/material.repository";
import { MaterialModel, UnidadeMedidaModel } from "../../database/models";
import { MaterialRepositoryErrors } from "./materialRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<Material | Material[]>>;

export class MaterialDBRepository implements MaterialRepository {
  constructor() {}

  async findAll(): Promise<Response> {
    try {
      const materialData = await MaterialModel.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: UnidadeMedidaModel,
            as: "unidadeMedida",
            attributes: ["id","nome", "nomenclatura", "categoria"],
          }
        ],
      });
      if (materialData. length === 0) {
        return left(new MaterialRepositoryErrors.MaterialListEmpty());
      }

      const materials = materialData.map((material) => {
        return MaterialMapper.toDomain(material);
      });

      return right(Result.ok<Material[]>(materials));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const materialData = await MaterialModel.findByPk(id.toString());

      if (!materialData) {
        return left(new MaterialRepositoryErrors.MaterialNotExists());
      }

      const material = MaterialMapper.toDomain(materialData);

      return right(Result.ok<Material>(material));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(titulo: string): Promise<boolean> {
    const material = await MaterialModel.findOne({
      where: {
        titulo: titulo,
      },
    });

    if (!material) {
      return false;
    }

    return true;
  }

  async save(material: Material): Promise<Response> {
    try {
      const materialCreated = await MaterialModel.create({
        ...MaterialMapper.toPersistence(material),
        dataCadastro: new Date(),
      });

      return right(Result.ok<Material>(MaterialMapper.toDomain(materialCreated)));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: string, input: any): Promise<Response> {
    try {
      const materialData = await this.findById(new UniqueEntityID(id));

      if (!materialData) {
        return left(new MaterialRepositoryErrors.MaterialNotExists());
      }

      const dataToUpdate = {
        ...input,
        dataAtualizacao: new Date(),
      };

      const updatedMaterial = await MaterialModel.update(dataToUpdate, {
        where: {
          id: id.toString(),
        },
        returning: true,
      });

      return right(
        Result.ok<Material>(
          MaterialMapper.toDomain(updatedMaterial[1][0].dataValues)
        )
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const materialData = await MaterialModel.findByPk(id.toString());

      if (!materialData) {
        return left(new MaterialRepositoryErrors.MaterialNotExists());
      }
      await MaterialModel.destroy({
        where: {
          id: id.toString(),
        },
      });

      return right(Result.ok<Material>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
