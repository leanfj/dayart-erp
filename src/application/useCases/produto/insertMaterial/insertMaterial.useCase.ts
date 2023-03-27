import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoRepository } from "../../../../domain/repositories/produto/produto.repository";
import { InsertMaterialErrors } from "./insertMaterialErrors";

type Response = Either<AppError.UnexpectedError, Result<Produto>>;
interface input {
  props: MaterialInputDTO;
  id: string;
}

export class InsertMaterialUseCase
  implements UseCase<input, Promise<Response>>
{
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({props, id}: input): Promise<Response> {
    try {
      const produtoFinded = await this.produtoRepository.findById(
        id
      );

      if (produtoFinded.isLeft()) {
        return left(
          new InsertMaterialErrors.ProdutoNotExists()
        );
      }

      const produtoData = await this.produtoRepository.insertMaterial(id, props);
      
      return right(Result.ok<Produto>(produtoData.value.getValue() as Produto));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
