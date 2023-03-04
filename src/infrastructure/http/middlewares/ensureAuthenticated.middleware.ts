import { NextFunction, Request, Response } from "express";

import { verify } from "jsonwebtoken";
import { DataStoredInToken } from "../interfaces/dataStoredInToken";
import { RequestWithUsuarioId } from "../interfaces/requestWithUsuario.interface";
import { WrongAuthenticationTokenException } from "../exceptions/wrongAuthenticationToken.exception";
import { AuthenticationTokenMissingException } from "../exceptions/authenticationTokenMissing.excepition";

export function ensureAuthenticated() {
  return async (
    request: RequestWithUsuarioId,
    response: Response,
    next: NextFunction
  ) => {
    const authToken = request.headers["authorization"];

    if (authToken) {
      const secret = process.env.JWT_SECRET;
      try {
        const token = authToken.split(" ")[1];
        const decoded = verify(token, secret) as DataStoredInToken;

        const signatureFailed = !!decoded === false;

        if (signatureFailed) {
          return response
            .status(403)
            .send({ message: "Token signature expired." });
        }
        request.usuarioId = decoded.id;
      } catch (error) {
        next(new WrongAuthenticationTokenException());
      }
      return next();
    } else {
      next(new AuthenticationTokenMissingException());
    }
  };
}
