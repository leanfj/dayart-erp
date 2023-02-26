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
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

export class Cliente extends Entity<ClienteProps> {
  constructor(props: ClienteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ClienteProps, id?: UniqueEntityID): Cliente {
    return new Cliente(props, id);
  }
}
