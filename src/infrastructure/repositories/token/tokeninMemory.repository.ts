import { Token } from "../../../domain/entities/token/token.entity";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import {
  Either,
  Left,
  Result,
  Right,
  left,
  right,
} from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { TokenRepository } from "../../../domain/repositories/token/token.repository";
import { TokenRepositoryErrors } from "./tokenRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<Token>>;

export class TokenInMemoryRepository implements TokenRepository {
  private tokens: Token[] = [];

  async findByUsuarioId(id: string | UniqueEntityID): Promise<Response> {
    try {
      const tokenData = this.tokens.find(
        (token) => token.usuarioId.toString() === id.toString()
      );
      if (!tokenData) {
        return left(new TokenRepositoryErrors.TokenNotExists());
      }
      return right(Result.ok<Token>(tokenData));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(id: string): Promise<boolean> {
    const token = this.tokens.find(
      (token) => token.id.toString() === id.toString()
    );

    if (!token) {
      return false;
    }

    return true;
  }

  async save(token: Token): Promise<Response> {
    try {
      const newToken = Token.create(
        {
          token: token.token,
          usuarioId: token.usuarioId,
          dataCadastro: token.dataCadastro || new Date(),
        },
        token.id
      );

      this.tokens.push(newToken);
      return right(Result.ok<Token>(newToken));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: string | UniqueEntityID): Promise<Response> {
    try {
      const index = this.tokens.findIndex((token) => token.id === id);
      if (index === -1) {
        return left(new TokenRepositoryErrors.TokenNotExists());
      }
      this.tokens.splice(index, 1);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
