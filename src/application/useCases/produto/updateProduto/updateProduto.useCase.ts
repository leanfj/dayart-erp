import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoRepository } from "../../../../domain/repositories/produto/produto.repository";
import { UpdateProdutoErrors } from "./updateProdutoErrors";

type Response = Either<AppError.UnexpectedError, Result<Produto>>;
type Request = {id: string, props: ProdutoInputDTO};
export class UpdateProdutoUseCase
  implements UseCase<Request, Promise<Response>>
{
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute(input: Request): Promise<Response> {
    try {
      const produtoFinded = await this.produtoRepository.findById(
        input.id
      );

      if (produtoFinded.isLeft()) {
        return left(
          new UpdateProdutoErrors.ProdutoNotExists()
        );
      }

      const produtoData = await this.produtoRepository.update(input.id, input.props);
      
      return right(Result.ok<Produto>(produtoData.value.getValue() as Produto));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
