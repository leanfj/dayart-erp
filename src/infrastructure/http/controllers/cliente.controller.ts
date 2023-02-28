import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";

import { BaseController } from "../interfaces/baseController";
import { ClienteService } from "../services/cliente.service";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";

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
      if(result.isLeft()) {
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
      if(result.isLeft()) {
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.ok(response, cliente);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const cliente = request.body;
    const id = request.params.id;
    try {
      const result = await this.clienteService.update(cliente, new UniqueEntityID(id));
      if(result.isLeft()) {
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.ok(response, cliente);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

  async delete(request: Request, response: Response,  next: NextFunction) {
    const id = request.params.id;
    try {
      const result = await this.clienteService.delete(new UniqueEntityID(id));
      if(result.isLeft()) {
        return this.fail(response, result.value.getErrorValue().message);
      } else {
        return this.ok(response, null);
      }
    } catch (err) {
      return this.fail(response, err);
    }
  }

  // async getPurchaseOrdersDocnum(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ) {
  //   const { docNum } = request.params;

  //   try {
  //     const purchaseInvoiceData =
  //       await this.purchaseOrderService.getPurchaseOrderDocNum(docNum);

  //     return response.status(200).json({ data: purchaseInvoiceData });
  //   } catch (error) {
  //     return response.status(404).json({ data: error });
  //   }
  // }

  // async getPurchaseOrdersDocEntry(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ) {
  //   const { docEntry } = request.params;

  //   try {
  //     const purchaseOrderData =
  //       await this.purchaseOrderService.getPurchaseOrderDocEntry(docEntry);

  //     return response.status(200).json({ data: purchaseOrderData });
  //   } catch (error) {
  //     return response.status(404).json({ data: error });
  //   }
  // }

  // async cancelPurchaseOrder(
  //   request: Request,
  //   response: Response,
  //   next: NextFunction
  // ) {
  //   const { list } = request.body;
  //   try {
  //     const bodyList = z.array(z.number()).parse(list);
  //     const purchaseInvoicedata =
  //       await this.purchaseOrderService.cancelListPurchaseOrder(bodyList);

  //     return response.status(200).json({ data: purchaseInvoicedata });
  //   } catch (error) {
  //     return response.status(401).json({ error });
  //   }
  // }
}
