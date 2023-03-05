import { Token } from "domain/entities/token/token.entity";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";

type Response = Either<AppError.UnexpectedError, Result<Token>>;

export interface TokenRepository {
  delete(id: string | UniqueEntityID): unknown;
  findByUsuarioId(id: string | UniqueEntityID): Promise<Response>;
  exists(id: string): Promise<boolean>;
  save(token: Token): Promise<Response>;
}
