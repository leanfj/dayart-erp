import { ValorElo7 } from "../../../../domain/valueObjects/produto/valorElo7";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoRepository } from "../../../../domain/repositories/produto/produto.repository";
import { CreateProdutoErrors } from "./createProdutoErrors";
import { RandomCode } from "../../../../domain/valueObjects/produto/randomCode";

type Response = Either<AppError.UnexpectedError, Result<Produto>>;

export class CreateProdutoUseCase
  implements UseCase<ProdutoInputDTO, Promise<Response>>
{
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute(input: ProdutoInputDTO): Promise<Response> {
    const produto = Produto.create({
      ...input
    });

    try {
      const produtoExists = await this.produtoRepository.exists(
        produto.titulo
      );

      if (produtoExists) {
        return left(
          new CreateProdutoErrors.ProdutoAlreadyExists(produto.titulo)
        );
      }

      await this.produtoRepository.save(produto);
      return right(Result.ok<Produto>(produto));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
