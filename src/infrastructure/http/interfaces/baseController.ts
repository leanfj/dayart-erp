import { Request, Response, Router } from "express";

export abstract class BaseController {
  public router = Router();

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T) {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  public clientError(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      400,
      message ? message : "Bad Request"
    );
  }

  public unauthorized(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      401,
      message ? message : "Unauthorized"
    );
  }

  public paymentRequired(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      402,
      message ? message : "Payment required"
    );
  }

  public forbidden(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      403,
      message ? message : "Forbidden"
    );
  }

  public notFound(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      404,
      message ? message : "Not found"
    );
  }

  public conflict(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      409,
      message ? message : "Conflict"
    );
  }

  public tooMany(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      429,
      message ? message : "Too many requests"
    );
  }

  public todo(res: Response) {
    return BaseController.jsonResponse(res, 400, "TODO");
  }

  public invalidInput(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      422,
      message ? message : "Invalid request"
    );
  }

  public fail(res: Response, error: Error | string) {
    console.log(error);
    return res.status(500).json({
      message: error.toString(),
    });
  }
}
