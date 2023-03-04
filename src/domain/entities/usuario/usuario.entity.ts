import { Entity } from "../../../core/domain/entity";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";

type UsuarioProps = {
  id?: string;
  nome: string;
  email: string;
  password?: string;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
};

export class Usuario extends Entity<UsuarioProps> {
  constructor(props: UsuarioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get nome(): string {
    return this.props.nome;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get dataCadastro(): Date {
    return this.props.dataCadastro;
  }

  get dataAtualizacao(): Date {
    return this.props.dataAtualizacao;
  }

  static create(props: UsuarioProps, id?: UniqueEntityID): Usuario {
    return new Usuario(props, id);
  }
}
