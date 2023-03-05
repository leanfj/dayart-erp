import { TokenModel } from "../../../infrastructure/database/models/token.model";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import {
  Either,
  Result,
  left,
  right,
} from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { TokenRepository } from "../../../domain/repositories/token/token.repository";
import { TokenRepositoryErrors } from "./tokenRepositoryErrors";
import { Token } from "../../../domain/entities/token/token.entity";
import { TokenMapper } from "../../../domain/mappers/token/token.mapper";

type Response = Either<AppError.UnexpectedError, Result<Token>>;

export class TokenDBRepository implements TokenRepository {
  constructor() {}

  async findByUsuarioId(id: string | UniqueEntityID): Promise<Response> {
    try {
      const xxx = id.toString()
      const tokenData = await TokenModel.findOne({
        where: {
          usuarioId: xxx,
        },
      });
      if (!tokenData) {
        return left(new TokenRepositoryErrors.TokenNotExists());
      }

      const token = TokenMapper.toDomain(tokenData);

      return right(Result.ok<Token>(token));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(id: string): Promise<boolean> {
    const token = await TokenModel.findByPk(id);

    if (!token) {
      return false;
    }

    return true;
  }

  async save(token: Token): Promise<Response> {
    try {
      const newToken = TokenMapper.toDomain(token);
      
      await TokenModel.create({
        ...TokenMapper.toPersistence(newToken),
        dataCadastro: new Date(),
      });

      return right(Result.ok<Token>(newToken));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const tokenData = await TokenModel.findByPk(id.toString());

      if (!tokenData) {
        return left(new TokenRepositoryErrors.TokenNotExists());
      }
      await TokenModel.destroy({
        where: {
          id: id.toString(),
        },
      });

      return right(Result.ok<Token>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
