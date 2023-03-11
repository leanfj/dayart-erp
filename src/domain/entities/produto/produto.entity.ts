import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { Entity } from "../../../core/domain/entity";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { ValorElo7 } from "../../../domain/valueObjects/produto/valorElo7";

type ProdutoProps = {
  id?: string;
  titulo: string;
  codigo?: RandomCode | string;
  descricao: string;
  valorVenda: number;
  valorCusto: number;
  materiais: string[];
  prazoProducao: string;
  valorElo7?: ValorElo7 | number;
};

export class Produto extends Entity<ProdutoProps> {
  constructor(props: ProdutoProps, id?: UniqueEntityID) {
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

  get valorVenda(): number {
    return this.props.valorVenda;
  }

  get valorCusto(): number {
    return this.props.valorCusto;
  }

  get materiais(): string[] {
    return this.props.materiais;
  }

  get prazoProducao(): string {
    return this.props.prazoProducao;
  }

  get valorElo7(): ValorElo7 | number {
    return this.props.valorElo7;
  }

  static create(props: ProdutoProps, id?: UniqueEntityID): Produto {
    props.codigo = props.codigo ? props.codigo : new RandomCode().Value;
    props.valorElo7 = props.valorElo7
      ? props.valorElo7
      : new ValorElo7(props.valorVenda).Value;
    return new Produto(props, id);
  }

  public calcularValorElo7(props: ProdutoProps): void {
    this.props.valorElo7 = new ValorElo7(props.valorVenda).Value;
  }
}
