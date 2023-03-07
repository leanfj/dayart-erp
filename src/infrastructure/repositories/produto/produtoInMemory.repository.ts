import { ValorElo7 } from "../../../domain/valueObjects/produto/valorElo7";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Produto } from "../../../domain/entities/produto/produto.entity";
import { ProdutoRepository } from "../../../domain/repositories/produto/produto.repository";
import { ProdutoRepositoryErrors } from "./produtoRepositoryErrors";
import { RandomCode } from "../../../domain/valueObjects/produto/randomCode";
import { ProdutoInputDTO } from "domain/DTOS/produto/produto.dto";

type Response = Either<AppError.UnexpectedError, Result<Produto | Produto[]>>;

export class ProdutoInMemoryRepository implements ProdutoRepository {
  private produtos: Produto[] = [];

  async findAll(): Promise<Response> {
    try {
      const produtoData = this.produtos;
      if (produtoData.length === 0) {
        return left(new ProdutoRepositoryErrors.ProdutoListEmpty());
      }

      const produtos = produtoData.map((produto) => {
        return Produto.create(
          {
            titulo: produto.titulo,
            codigo: new RandomCode(),
            descricao: produto.descricao,
            valorVenda: produto.valorVenda,
            valorCusto: produto.valorCusto,
            materiais: produto.materiais,
            prazoProducao: produto.prazoProducao,
            valorElo7: new ValorElo7(produto.valorVenda),
          },
          new UniqueEntityID(produto.id.toString())
        );
      });

      return right(Result.ok<Produto[]>(produtos));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const produtoData = this.produtos.find((produto) => produto.id === id);
      if (!produtoData) {
        return left(new ProdutoRepositoryErrors.ProdutoNotExists());
      }
      return right(Result.ok<Produto>(produtoData));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(titulo: string): Promise<boolean> {
    const produto = this.produtos.find((produto) => produto.titulo === titulo);

    if (!produto) {
      return false;
    }

    return true;
  }

  async save(input: Produto): Promise<Response> {
    try {
      const newProduto = Produto.create({
        titulo: input.titulo,
        descricao: input.descricao,
        valorVenda: input.valorVenda,
        valorCusto: input.valorCusto,
        materiais: input.materiais,
        prazoProducao: input.prazoProducao,
        dataCadastro: input.dataCadastro || new Date(),
      }, new UniqueEntityID(input.id.toString()));

      this.produtos.push(newProduto);
      return right(Result.ok<Produto>(newProduto));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: UniqueEntityID, input: any): Promise<Response> {
    try {
      const index = this.produtos.findIndex((produto) => produto.id === id);
      if (index === -1) {
        return left(new ProdutoRepositoryErrors.ProdutoNotExists());
      }
      const produto = this.produtos[index];
      this.produtos[index] = { ...produto, ...input };
      return right(Result.ok<Produto>(this.produtos[index]));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const index = this.produtos.findIndex((produto) => produto.id === id);
      if (index === -1) {
        return left(new ProdutoRepositoryErrors.ProdutoNotExists());
      }
      this.produtos.splice(index, 1);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
