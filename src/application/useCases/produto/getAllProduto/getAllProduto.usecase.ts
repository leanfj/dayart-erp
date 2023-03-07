import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoRepository } from "../../../../domain/repositories/produto/produto.repository";
import { GetAllProdutoErrors } from "./getAllProdutoErrors";

type Response = Either<AppError.UnexpectedError, Result<Produto[] | Produto>>;

export class GetAllProdutoUseCase
  implements UseCase<ProdutoInputDTO, Promise<Response>>
{
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute(): Promise<Response> {
    try {
      const produtoOrError = await this.produtoRepository.findAll();
      if (produtoOrError.isLeft()) {
        return left(new GetAllProdutoErrors.ProdutoListEmpty());
      }

      return right(
        Result.ok<Produto[] | Produto>(produtoOrError.value.getValue())
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
