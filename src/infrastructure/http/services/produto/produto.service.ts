import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { CreateProdutoUseCase } from "../../../../application/useCases/produto/createProduto/createProduto.useCase";
import { DeleteProdutoUseCase } from "../../../../application/useCases/produto/deleteProduto/deleteProduto.useCase";
import { GetAllProdutoUseCase } from "../../../../application/useCases/produto/getAllProduto/getAllProduto.usecase";
import { UpdateProdutoUseCase } from "../../../../application/useCases/produto/updateProduto/updateProduto.useCase";
import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { validatorDTO } from "../../../../core/domain/validatorDTO";
import { Either, Result, left, right } from "../../../../core/logic/result";
import { AppError } from "../../../../core/shared/appError";
import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoRepository } from "../../../../domain/repositories/produto/produto.repository";
import { InsertMaterialUseCase } from "../../../../application/useCases/produto/insertMaterial/insertMaterial.useCase";

type Response = Either<AppError.UnexpectedError, Result<Produto[] | Produto>>;

export class ProdutoService {
  private createProdutoUseCase: CreateProdutoUseCase;
  private updateProdutoUseCase: UpdateProdutoUseCase;
  private getAllProdutoUseCase: GetAllProdutoUseCase;
  private deleteProdutoUseCase: DeleteProdutoUseCase;
  private insertMaterialUseCase: InsertMaterialUseCase;

  constructor(readonly produtoRepository: ProdutoRepository) {
    this.createProdutoUseCase = new CreateProdutoUseCase(produtoRepository);
    this.updateProdutoUseCase = new UpdateProdutoUseCase(produtoRepository);
    this.getAllProdutoUseCase = new GetAllProdutoUseCase(produtoRepository);
    this.deleteProdutoUseCase = new DeleteProdutoUseCase(produtoRepository);
    this.insertMaterialUseCase = new InsertMaterialUseCase(produtoRepository);

  }

  public async create(produto: ProdutoInputDTO): Promise<Response> {
    try {
      const validOrError = await validatorDTO(ProdutoInputDTO, produto, {});
      if (validOrError.isLeft()) {
        return left(validOrError.value);
      }
      const result = await this.createProdutoUseCase.execute(produto);
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Produto>(result.value.getValue() as Produto));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async getAll(): Promise<Response> {
    try {
      const result = await this.getAllProdutoUseCase.execute();

      if (result.isLeft()) {
        return left(result.value);
      } else {
        const produtoList = result.value.getValue();
        return right(Result.ok<Produto[] | Produto>(produtoList));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async update(
    produto: ProdutoInputDTO,
    id: UniqueEntityID
  ): Promise<Response> {
    try {
      const validOrError = await validatorDTO(ProdutoInputDTO, produto, {skipMissingProperties: true});
      if (validOrError.isLeft()) {
        return left(validOrError.value);
      }
      const result = await this.updateProdutoUseCase.execute({
        props: validOrError.value.getValue(),
        id: id.toString(),
      });

      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Produto>(result.value.getValue()));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const result = await this.deleteProdutoUseCase.execute(id);
      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Produto>(result.value.getValue()));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  public async insertMaterial(
    material: any,
    id: UniqueEntityID
  ): Promise<Response> {
    try {
      const result = await this.insertMaterialUseCase.execute({
        props: material,
        id: id.toString(),
      });

      if (result.isLeft()) {
        return left(result.value);
      } else {
        return right(Result.ok<Produto>(result.value.getValue()));
      }
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
