import { NextFunction, Request, Response, Router } from "express";

import { BaseController } from "../interfaces/baseController";
import { ClienteService } from "../services/cliente.service";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { CreateClienteErrors } from "../../../application/useCases/cliente/createCliente/createClienteErrors";
import { GetAllClienteErrors } from "../../../application/useCases/cliente/getAllCliente/getAllClienteErrors";
import { UpdateClienteErrors } from "../../../application/useCases/cliente/updateCliente/updateClienteErrors";
import { DeleteClienteErrors } from "../../../application/useCases/cliente/deleteCliente/deleteClienteErrors";
import { ValidatorDTOErrors } from "../../../core/domain/validatorDTOErros";

export class ClienteController extends BaseController {
  public path = "/clientes";
  public router = Router();

  constructor(private clienteService: ClienteService) {
    super();
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    this.router.post(
      `${this.path}`,
      (request: Request, response: Response, next: NextFunction) =>
        this.create(request, response, next)
    );
    this.router.get(
      `${this.path}`,
      (request: Request, response: Response, next: NextFunction) =>
        this.getAll(request, response, next)
    );

    this.router.patch(
      `${this.path}/:id`,
      (request: Request, response: Response, next: NextFunction) =>
        this.update(request, response, next)
    );

    this.router.delete(
      `${this.path}/:id`,
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
      const result = await this.clienteService.getAll();
      if (result.isLeft()) {
        if (result.value instanceof GetAllClienteErrors.ClienteListEmpty) {
          return this.notFound(res, result.value.getErrorValue().message);
        }
        return this.fail(res, result.value.getErrorValue().message);
      } else {
        const clienteList = result.value.getValue();
        return this.ok(res, clienteList);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const cliente = request.body;
    try {
      const result = await this.clienteService.create(cliente);

      if (result.isLeft()) {
        if (result.value instanceof CreateClienteErrors.ClienteAlreadyExists) {
          return this.conflict(response, result.value.getErrorValue().message);
        }
        if (result.value instanceof ValidatorDTOErrors.ValidatorErrors) {
          return this.invalidInput(response, result.value.getErrorValue().message);
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
    const cliente = request.body;
    const id = request.params.id;
    try {
      const result = await this.clienteService.update(
        cliente,
        new UniqueEntityID(id)
      );
      if (result.isLeft()) {
        if (result.value instanceof UpdateClienteErrors.ClienteNotExists) {
          return this.notFound(response, result.value.getErrorValue().message);
        }
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.ok(response, cliente);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    try {
      const result = await this.clienteService.delete(new UniqueEntityID(id));
      if (result.isLeft()) {
        if (result.value instanceof DeleteClienteErrors.ClienteNotExists) {
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
