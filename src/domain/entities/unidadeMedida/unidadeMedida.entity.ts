import { Entity } from "../../../core/domain/entity";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";

type UnidadeMedidaProps = {
  id?: string;
  nome: string;
  nomenclatura: string;
  categoria: string;
};

export class UnidadeMedida extends Entity<UnidadeMedidaProps> {
  constructor(props: UnidadeMedidaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get nome(): string {
    return this.props.nome;
  }

  get nomenclatura(): string {
    return this.props.nomenclatura;
  }

  get categoria(): string {
    return this.props.categoria;
  }

  static create(props: UnidadeMedidaProps, id?: UniqueEntityID): UnidadeMedida {
    props.categoria = props.categoria.toUpperCase();
    return new UnidadeMedida(props, id);
  }
}
