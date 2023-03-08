import { UseCase } from "../../../../core/application/useCase";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoRepository } from "../../../../domain/repositories/produto/produto.repository";
import { DeleteProdutoErrors } from "./deleteProdutoErrors";

type Response = Either<AppError.UnexpectedError, Result<Produto>>;

export class DeleteProdutoUseCase
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
          new DeleteProdutoErrors.ProdutoNotExists()
        );
      }

      await this.produtoRepository.delete(id);
      
      return right(Result.ok<Produto>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
