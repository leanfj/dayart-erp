import { NextFunction, Request, Response, Router } from "express";

import { BaseController } from "../../interfaces/baseController";
import { UsuarioService } from "../../services/usuario/usuario.service";
// import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { RegisterUsuarioErrors } from "../../../../application/useCases/usuario/registerUsuario/registerUsuarioErrors";
import { ValidatorDTOErrors } from "../../../../core/domain/validatorDTOErros";

export class UsuarioController extends BaseController {
  public path = "/usuarios";
  public router = Router();

  constructor(private usuarioService: UsuarioService) {
    super();
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      (request: Request, response: Response, next: NextFunction) =>
        this.create(request, response, next)
    );
    // this.router.get(
    //   `${this.path}`,
    //   (request: Request, response: Response, next: NextFunction) =>
    //     this.getAll(request, response, next)
    // );

    // this.router.patch(
    //   `${this.path}/:id`,
    //   (request: Request, response: Response, next: NextFunction) =>
    //     this.update(request, response, next)
    // );

    // this.router.delete(
    //   `${this.path}/:id`,
    //   (request: Request, response: Response, next: NextFunction) =>
    //     this.delete(request, response, next)
    // );
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

  async create(request: Request, response: Response, next: NextFunction) {
    const usuario = request.body;

    if(usuario.password !== usuario.passwordConfirm) {
      return this.invalidInput(response, "Password and password confirm not match");
    }

    try {
      const result = await this.usuarioService.create(usuario);

      if (result.isLeft()) {
        if (result.value instanceof RegisterUsuarioErrors.UsuarioAlreadyExists) {
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

  // async update(request: Request, response: Response, next: NextFunction) {
  //   const cliente = request.body;
  //   const id = request.params.id;
  //   try {
  //     const result = await this.clienteService.update(
  //       cliente,
  //       new UniqueEntityID(id)
  //     );
  //     if (result.isLeft()) {
  //       if (result.value instanceof UpdateClienteErrors.ClienteNotExists) {
  //         return this.notFound(response, result.value.getErrorValue().message);
  //       }
  //       return this.fail(response, result.value.getErrorValue().message);
  //     } else {
  //       return this.ok(response, cliente);
  //     }
  //   } catch (err) {
  //     return this.fail(response, err);
  //   }
  // }

  // async delete(request: Request, response: Response, next: NextFunction) {
  //   const id = request.params.id;
  //   try {
  //     const result = await this.clienteService.delete(new UniqueEntityID(id));
  //     if (result.isLeft()) {
  //       if (result.value instanceof DeleteClienteErrors.ClienteNotExists) {
  //         return this.notFound(response, result.value.getErrorValue().message);
  //       }
  //       return this.fail(response, result.value.getErrorValue().message);
  //     } else {
  //       return this.ok(response, null);
  //     }
  //   } catch (err) {
  //     return this.fail(response, err);
  //   }
  // }
}
