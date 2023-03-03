import { NextFunction, Request, Response, Router } from "express";

import { BaseController } from "../../interfaces/baseController";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { LoginService } from "../../../http/services/autorizacao/login.service";
// import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { RegisterUsuarioErrors } from "../../../../application/useCases/usuario/registerUsuario/registerUsuarioErrors";
import { ValidatorDTOErrors } from "../../../../core/domain/validatorDTOErros";
import { validatorDto } from "../../../../core/domain/validatorDTO";
import { LoginInputDTO } from "../../../../domain/DTOS/login/loginInputDTO";
import { left } from "../../../../core/logic/result";
import { GetUsuarioByEmailErrors } from "../../../../application/useCases/usuario/getUsuarioByEmail/GetUsuarioByEmailErrors";
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { LoginErrors } from "../../../../application/useCases/autorizacao/login/loginErrors";

export class AutorizacaoController extends BaseController {
  public path = "/autorizacao";
  public router = Router();

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {
    super();
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      (request: Request, response: Response, next: NextFunction) =>
        this.login(request, response, next)
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

  async login(request: Request, response: Response, next: NextFunction) {
    const login = request.body;

    const validOrError = await validatorDto(LoginInputDTO, login, {});
    if (validOrError.isLeft()) {
      return this.invalidInput(
        response,
        validOrError.value.getErrorValue().message
      );
    }

    try {
      const usuarioOrError = await this.usuarioService.getByEmail(login.email);
      if (usuarioOrError.isLeft()) {
        if (
          usuarioOrError.value instanceof
          GetUsuarioByEmailErrors.UsuarioNotExists
        ) {
          return this.unauthorized(
            response,
            new LoginErrors.PasswordOrEmailIncorrect().getValue().message
          );
        }
      } else {
        const usuario = usuarioOrError.value.getValue() as unknown as Usuario;

        const loginOrError = await this.loginService.login(login, usuario);

        if (loginOrError.isLeft()) {
          return this.unauthorized(
            response,
            new LoginErrors.PasswordOrEmailIncorrect().getErrorValue().message
          );
        }

        return this.ok(response, {token: loginOrError.value.getValue()});
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