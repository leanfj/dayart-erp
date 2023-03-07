import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { UseCase } from "../../../../core/application/useCase";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoRepository } from "../../../../domain/repositories/produto/produto.repository";
import { UpdateProdutoErrors } from "./updateProdutoErrors";

type Response = Either<AppError.UnexpectedError, Result<Produto>>;

export class UpdateProdutoUseCase
  implements UseCase<ProdutoInputDTO, Promise<Response>>
{
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute(input: ProdutoInputDTO): Promise<Response> {
    const produto = Produto.create({
      titulo: input.titulo,
      descricao: input.descricao,
      valorVenda: input.valorVenda,
      valorCusto: input.valorCusto,
      materiais: input.materiais,
      prazoProducao: input.prazoProducao,
      dataCadastro: input.dataCadastro,
      dataAtualizacao: input.dataAtualizacao,
    }, new UniqueEntityID(input.id));

    try {
      const produtoData = await this.produtoRepository.findById(
        input.id
      );

      if (produtoData.isLeft()) {
        return left(
          new UpdateProdutoErrors.ProdutoNotExists()
        );
      }

      await this.produtoRepository.update(input.id, produto);
      
      return right(Result.ok<Produto>(produto));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
