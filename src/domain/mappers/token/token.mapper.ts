import { Mapper } from "../../../core/shared/mapper";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Token } from "../../../domain/entities/token/token.entity";

export abstract class TokenMapper implements Mapper<Token> {
  public static toDomain(raw: any): Token {
    const token = Token.create(
      {
        token: raw.token,
        usuarioId: raw.usuarioId,
        dataCadastro: raw.dataCadastro,
      },
      new UniqueEntityID(raw.id)
    );

    return token;
  }

  public static toPersistence(token: Token): any {
    return {
      token: token.token,
      usuarioId: token.usuarioId,
    };
  }
}
