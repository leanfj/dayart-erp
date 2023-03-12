import { NextFunction, Request, Response, Router } from "express";

import { BaseController } from "../../interfaces/baseController";
import { MaterialService } from "../../services/material/material.service";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { CreateMaterialErrors } from "../../../../application/useCases/material/createMaterial/createMaterialErrors";
import { GetAllMaterialErrors } from "../../../../application/useCases/material/getAllMaterial/getAllMaterialErrors";
import { UpdateMaterialErrors } from "../../../../application/useCases/material/updateMaterial/updateMaterialErrors";
import { DeleteMaterialErrors } from "../../../../application/useCases/material/deleteMaterial/deleteMaterialErrors";
import { ValidatorDTOErrors } from "../../../../core/domain/validatorDTOErros";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated.middleware";

export class MaterialController extends BaseController {
  public path = "/materiais";
  public router = Router();

  constructor(private materialService: MaterialService) {
    super();
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    this.router.post(
      `${this.path}`,
      ensureAuthenticated(),
      (request: Request, response: Response, next: NextFunction) =>
        this.create(request, response, next)
    );
    this.router.get(
      `${this.path}`,
      ensureAuthenticated(),
      (request: Request, response: Response, next: NextFunction) =>
        this.getAll(request, response, next)
    );

    this.router.patch(
      `${this.path}/:id`,
      ensureAuthenticated(),
      (request: Request, response: Response, next: NextFunction) =>
        this.update(request, response, next)
    );

    this.router.delete(
      `${this.path}/:id`,
      ensureAuthenticated(),
      (request: Request, response: Response, next: NextFunction) =>
        this.delete(request, response, next)
    );
    // this.router.get(
    //   `${this.path}/DocEntry/:docEntry`,
    //   (request: Request, response: Response, next: NextFunction) =>
    //     this.getPurchaseOrdersDocEntry(request, response, next)
    // );
    // this.router
    //   .all(`${this.path}/*`, authMiddleware)
    //   .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
    //   .delete(`${this.path}/:id`, this.deletePost)
    //   .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost)
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.materialService.getAll();
      if (result.isLeft()) {
        if (result.value instanceof GetAllMaterialErrors.MaterialListEmpty) {
          return this.notFound(res, result.value.getErrorValue().message);
        }
        return this.fail(res, result.value.getErrorValue().message);
      } else {
        const materialList = result.value.getValue();
        return this.ok(res, materialList);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const material = request.body;
    try {
      const result = await this.materialService.create(material);

      if (result.isLeft()) {
        if (result.value instanceof CreateMaterialErrors.MaterialAlreadyExists) {
          return this.conflict(response, result.value.getErrorValue().message);
        }
        if (result.value instanceof ValidatorDTOErrors.ValidatorErrors) {
          return this.invalidInput(
            response,
            result.value.getErrorValue().message
          );
        }
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.created(response);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const material = request.body;
    const id = request.params.id;
    try {
      const result = await this.materialService.update(
        material,
        new UniqueEntityID(id)
      );
      if (result.isLeft()) {
        if (result.value instanceof UpdateMaterialErrors.MaterialNotExists) {
          return this.notFound(response, result.value.getErrorValue().message);
        }
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.ok(response, material);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const result = await this.materialService.delete(new UniqueEntityID(id));
      if (result.isLeft()) {
        if (result.value instanceof DeleteMaterialErrors.MaterialNotExists) {
          return this.notFound(response, result.value.getErrorValue().message);
        }
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.ok(response, null);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }
}
