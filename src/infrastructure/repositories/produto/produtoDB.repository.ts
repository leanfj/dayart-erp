import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Produto } from "../../../domain/entities/produto/produto.entity";
import { ProdutoMapper } from "../../../domain/mappers/produto/produto.mapper";
import { ProdutoRepository } from "../../../domain/repositories/produto/produto.repository";
import { ProdutoModel } from "../../database/models";
import { ProdutoRepositoryErrors } from "./produtoRepositoryErrors";
import { ValorElo7 } from "../../../domain/valueObjects/produto/valorElo7";

type Response = Either<AppError.UnexpectedError, Result<Produto | Produto[]>>;

export class ProdutoDBRepository implements ProdutoRepository {
  constructor() {}

  async findAll(): Promise<Response> {
    try {
      const produtoData = await ProdutoModel.findAll();
      if (produtoData.length === 0) {
        return left(new ProdutoRepositoryErrors.ProdutoListEmpty());
      }

      const produtos = produtoData.map((produto) => {
        return ProdutoMapper.toDomain(produto);
      });

      return right(Result.ok<Produto[]>(produtos));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const produtoData = await ProdutoModel.findByPk(id.toString());

      if (!produtoData) {
        return left(new ProdutoRepositoryErrors.ProdutoNotExists());
      }

      const produto = ProdutoMapper.toDomain(produtoData);

      return right(Result.ok<Produto>(produto));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(titulo: string): Promise<boolean> {
    const produto = await ProdutoModel.findOne({
      where: {
        titulo: titulo,
      },
    });

    if (!produto) {
      return false;
    }

    return true;
  }

  async save(produto: Produto): Promise<Response> {
    try {
      const produtoCreated = await ProdutoModel.create({
        ...ProdutoMapper.toPersistence(produto),
        dataCadastro: new Date(),
      });

      return right(Result.ok<Produto>(ProdutoMapper.toDomain(produtoCreated)));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: string, input: any): Promise<Response> {
    try {
      const produtoData = await this.findById(new UniqueEntityID(id));

      if (!produtoData) {
        return left(new ProdutoRepositoryErrors.ProdutoNotExists());
      }

      if (
        input.valorVenda &&
        !input.valorElo7
      ) {
        input.valorElo7 = new ValorElo7(input.valorVenda).Value;
      }

      const dataToUpdate = {
        ...input,
        dataAtualizacao: new Date(),
      };

      const updatedProduto = await ProdutoModel.update(dataToUpdate, {
        where: {
          id: id.toString(),
        },
        returning: true,
      });

      return right(
        Result.ok<Produto>(
          ProdutoMapper.toDomain(updatedProduto[1][0].dataValues)
        )
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const produtoData = await ProdutoModel.findByPk(id.toString());

      if (!produtoData) {
        return left(new ProdutoRepositoryErrors.ProdutoNotExists());
      }
      await ProdutoModel.destroy({
        where: {
          id: id.toString(),
        },
      });

      return right(Result.ok<Produto>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
