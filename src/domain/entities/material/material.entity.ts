import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { Entity } from "../../../core/domain/entity";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";

type MaterialProps = {
  id?: string;
  titulo: string;
  codigo?: RandomCode | string;
  descricao: string;
  unidadeMedida: string;
  valor: number;
};

export class Material extends Entity<MaterialProps> {
  constructor(props: MaterialProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get titulo(): string {
    return this.props.titulo;
  }

  get codigo(): RandomCode | string {
    return this.props.codigo;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  get unidadeMedida(): string {
    return this.props.unidadeMedida;
  }

  get valor(): number {
    return this.props.valor;
  }

  static create(props: MaterialProps, id?: UniqueEntityID): Material {
    props.codigo = props.codigo ? props.codigo : new RandomCode().Value;

    return new Material(props, id);
  }
}
