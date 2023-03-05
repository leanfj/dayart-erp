import { Entity } from "../../../core/domain/entity";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";

type TokenProps = {
  id?: string;
  token: string;
  usuarioId: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
};

export class Token extends Entity<TokenProps> {
  constructor(props: TokenProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get token(): string {
    return this.props.token;
  }

  get usuarioId(): string {
    return this.props.usuarioId;
  }

  get dataCadastro(): Date {
    return this.props.dataCadastro;
  }

  get dataAtualizacao(): Date {
    return this.props.dataAtualizacao;
  }

  static create(props: TokenProps, id?: UniqueEntityID): Token {
    return new Token(props, id);
  }
}
