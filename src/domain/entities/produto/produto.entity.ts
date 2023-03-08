import { RandomCode } from "../../../domain/valueObjects/produto/randomCode";
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
  dataCadastro?: Date;
  dataAtualizacao?: Date;
};

export class Produto extends Entity<ProdutoProps> {
  constructor(props: ProdutoProps, id?: UniqueEntityID) {
    super(props, id);
    this.props.codigo = this.codigo || new RandomCode().Value;
    this.props.valorElo7 = this.valorElo7 || new ValorElo7(this.props.valorVenda).Value;
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

  get dataCadastro(): Date {
    return this.props.dataCadastro;
  }

  get dataAtualizacao(): Date {
    return this.props.dataAtualizacao;
  }

  static create(props: ProdutoProps, id?: UniqueEntityID): Produto {
    return new Produto(props, id);
  }
}
