import { Either, Result } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";

type Response = Either<AppError.UnexpectedError, Result<void>>;

export interface EmailServiceRepository {
  send(
    email: string,
    subject: string,
    payload: { nome: string; link?: string },
    template: string
  ): Promise<Response>;
}
