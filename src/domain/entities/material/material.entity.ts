import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { Entity } from "../../../core/domain/entity";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { UnidadeMedida } from "../unidadeMedida/unidadeMedida.entity";

type MaterialProps = {
  id?: string;
  titulo: string;
  codigo?: RandomCode | string;
  descricao: string;
  // unidadeMedidaId: string;
  unidadeMedida?: UnidadeMedida;
  valor: number;
  quantidade: number;
  valorUnitario?: number;
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

  // get unidadeMedidaId(): string {
  //   return this.props.unidadeMedidaId;
  // }

  get unidadeMedida(): UnidadeMedida {
    return this.props.unidadeMedida;
  }

  get valor(): number {
    return this.props.valor;
  }

  get valorUnitario(): number {
    return this.props.valorUnitario;
  }

  get quantidade(): number {
    return this.props.quantidade;
  }

  static create(props: MaterialProps, id?: UniqueEntityID): Material {
    props.codigo = props.codigo ? props.codigo : new RandomCode().Value;
    props.valorUnitario = this.calculateValorUnitario(props.valor, props.quantidade); 
    return new Material(props, id);
  }

  public static calculateValorUnitario(valor: number, quantidade: number): number {
    return valor / quantidade;
  }
}
