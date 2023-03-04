import { Request } from "express";

export interface RequestWithUsuarioId extends Request {
  usuarioId: string ;
}

