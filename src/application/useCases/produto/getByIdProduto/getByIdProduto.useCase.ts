import { ProdutoMapper } from "../../../../domain/mappers/produto/produto.mapper";
import { UseCase } from "../../../../core/application/useCase";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoRepository } from "../../../../domain/repositories/produto/produto.repository";
import { GetByIdProdutoErrors } from "./getByIdProdutoErrors";

type Response = Either<AppError.UnexpectedError, Result<Produto>>;

export class GetByIdProdutoUseCase
  implements UseCase<UniqueEntityID , Promise<Response>>
{
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute(id: UniqueEntityID): Promise<Response> {

    try {
      const produtoData = await this.produtoRepository.findById(
        id
      );

      if (produtoData.isLeft()) {
        return left(
          new GetByIdProdutoErrors.ProdutoNotExists()
        );
      }

      return right(Result.ok<Produto>(produtoData.value.getValue() as Produto));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
