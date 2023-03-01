import { Entity } from "../../../core/domain/entity";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";

type ClienteProps = {
  id?: string;
  nome: string;
  email: string;
  genero: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  cpf: string;
  dataEvento: Date;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export class Cliente extends Entity<ClienteProps> {
  constructor(props: ClienteProps, id?: UniqueEntityID) {
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

  get genero(): string {
    return this.props.genero;
  }
  
  get telefone(): string {
    return this.props.telefone;
  }

  get endereco(): string {
    return this.props.endereco;
  }

  get cidade(): string {
    return this.props.cidade;
  }

  get estado(): string {
    return this.props.estado;
  }

  get cep(): string {
    return this.props.cep;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  get dataEvento(): Date {
    return this.props.dataEvento;
  }

  get dataCadastro(): Date {
    return this.props.dataCadastro;
  }

  get dataAtualizacao(): Date {
    return this.props.dataAtualizacao;
  }

  static create(props: ClienteProps, id?: UniqueEntityID): Cliente {
    return new Cliente(props, id);
  }
}
