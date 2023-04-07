import { NextFunction, Request, Response, Router } from "express";

import { BaseController } from "../../interfaces/baseController";
import { UnidadeMedidaService } from "../../services/unidadeMedida/unidadeMedida.service";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { CreateUnidadeMedidaErrors } from "../../../../application/useCases/unidadeMedida/createUnidadeMedida/createUnidadeMedidaErrors";
import { GetAllUnidadeMedidaErrors } from "../../../../application/useCases/unidadeMedida/getAllUnidadeMedida/getAllUnidadeMedidaErrors";
import { UpdateUnidadeMedidaErrors } from "../../../../application/useCases/unidadeMedida/updateUnidadeMedida/updateUnidadeMedidaErrors";
import { DeleteUnidadeMedidaErrors } from "../../../../application/useCases/unidadeMedida/deleteUnidadeMedida/deleteUnidadeMedidaErrors";
import { ValidatorDTOErrors } from "../../../../core/domain/validatorDTOErros";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated.middleware";

export class UnidadeMedidaController extends BaseController {
  public path = "/unidadeMedidas";
  public router = Router();

  constructor(private unidadeMedidaService: UnidadeMedidaService) {
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
      const result = await this.unidadeMedidaService.getAll();
      if (result.isLeft()) {
        if (result.value instanceof GetAllUnidadeMedidaErrors.UnidadeMedidaListEmpty) {
          return this.notFound(res, result.value.getErrorValue().message);
        }
        return this.fail(res, result.value.getErrorValue().message);
      } else {
        const unidadeMedidaList = result.value.getValue();
        return this.ok(res, unidadeMedidaList);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const unidadeMedida = JSON.parse(decodeURIComponent(request.body));
    try {
      const result = await this.unidadeMedidaService.create(unidadeMedida);

      if (result.isLeft()) {
        if (result.value instanceof CreateUnidadeMedidaErrors.UnidadeMedidaAlreadyExists) {
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
    const unidadeMedida = JSON.parse(decodeURIComponent(request.body));
    const id = request.params.id;
    try {
      const result = await this.unidadeMedidaService.update(
        unidadeMedida,
        new UniqueEntityID(id)
      );
      if (result.isLeft()) {
        if (result.value instanceof UpdateUnidadeMedidaErrors.UnidadeMedidaNotExists) {
          return this.notFound(response, result.value.getErrorValue().message);
        }
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.ok(response, unidadeMedida);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const result = await this.unidadeMedidaService.delete(new UniqueEntityID(id));
      if (result.isLeft()) {
        if (result.value instanceof DeleteUnidadeMedidaErrors.UnidadeMedidaNotExists) {
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
