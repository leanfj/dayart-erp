import { NextFunction, Request, Response, Router } from "express";

import { BaseController } from "../../interfaces/baseController";
import { ProdutoService } from "../../services/produto/produto.service";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { CreateProdutoErrors } from "../../../../application/useCases/produto/createProduto/createProdutoErrors";
import { GetAllProdutoErrors } from "../../../../application/useCases/produto/getAllProduto/getAllProdutoErrors";
import { UpdateProdutoErrors } from "../../../../application/useCases/produto/updateProduto/updateProdutoErrors";
import { DeleteProdutoErrors } from "../../../../application/useCases/produto/deleteProduto/deleteProdutoErrors";
import { ValidatorDTOErrors } from "../../../../core/domain/validatorDTOErros";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated.middleware";
import { Produto } from "domain/entities/produto/produto.entity";

export class ProdutoController extends BaseController {
  public path = "/produtos";
  public router = Router();

  constructor(private produtoService: ProdutoService) {
    super();
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    // this.router.all(
    //   `${this.path}/*`,
    //   ensureAuthenticated(),
    //   (request: Request, response: Response, next: NextFunction) => {}
    // )
    this.router.post(
      `${this.path}`,
      ensureAuthenticated(),
      (request: Request, response: Response, next: NextFunction) =>
        this.create(request, response, next)
    )
    this.router.post(
      `${this.path}/:id`,
      ensureAuthenticated(),
      (request: Request, response: Response, next: NextFunction) =>
        this.insertMaterial(request, response, next)
    )
    this.router.get(
      `${this.path}`,
      ensureAuthenticated(),
      (request: Request, response: Response, next: NextFunction) =>
      this.getAll(request, response, next)
    )
    this.router.get(
      `${this.path}/:id`,
      ensureAuthenticated(),
      async (request: Request, response: Response, next: NextFunction) =>
        await this.getById(request, response, next)
    )
    this.router.patch(
      `${this.path}/:id`,
      ensureAuthenticated(),
      (request: Request, response: Response, next: NextFunction) =>
        this.update(request, response, next)
    )
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
      const result = await this.produtoService.getAll();
      if (result.isLeft()) {
        if (result.value instanceof GetAllProdutoErrors.ProdutoListEmpty) {
          return this.notFound(res, result.value.getErrorValue().message);
        }
        return this.fail(res, result.value.getErrorValue().message);
      } else {
        const produtoList = result.value.getValue();
        return this.ok(res, produtoList);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }


  async getById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const result = await this.produtoService.getById(new UniqueEntityID(id));
      if (result.isLeft()) {
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        const produto = result.value.getValue() as Produto;
        return this.ok(response, produto.props.materiais);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const produto = JSON.parse(decodeURIComponent(request.body));
    try {
      const result = await this.produtoService.create(produto);

      if (result.isLeft()) {
        if (result.value instanceof CreateProdutoErrors.ProdutoAlreadyExists) {
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
    const produto = JSON.parse(decodeURIComponent(request.body));
    const id = request.params.id;
    try {
      const result = await this.produtoService.update(
        produto,
        new UniqueEntityID(id)
      );
      if (result.isLeft()) {
        if (result.value instanceof UpdateProdutoErrors.ProdutoNotExists) {
          return this.notFound(response, result.value.getErrorValue().message);
        }
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.ok(response, produto);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const result = await this.produtoService.delete(new UniqueEntityID(id));
      if (result.isLeft()) {
        if (result.value instanceof DeleteProdutoErrors.ProdutoNotExists) {
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

  async insertMaterial(request: Request, response: Response, next: NextFunction) {
    const material = JSON.parse(decodeURIComponent(request.body).replace(/values=/g, ''));
    const id = request.params.id;
    try {
      const result = await this.produtoService.insertMaterial(
        material,
        new UniqueEntityID(id)
      );
      if (result.isLeft()) {
        if (result.value instanceof UpdateProdutoErrors.ProdutoNotExists) {
          return this.notFound(response, result.value.getErrorValue().message);
        }
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.ok(response, result);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

}
