import { NextFunction, Request, Response } from "express";
import colors from "colors/safe";

export function loggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(`${colors.bold(colors.green(request.method))} ${request.path}`);
  next();
}
