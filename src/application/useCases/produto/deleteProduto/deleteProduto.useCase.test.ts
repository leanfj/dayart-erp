import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoInMemoryRepository } from "../../../../infrastructure/repositories/produto/produtoInMemory.repository";
import { DeleteProdutoUseCase } from "./deleteProduto.useCase";
import { describe, it, expect} from 'vitest';
describe("DeleteProdutoUseCase", () => {
  it("should delete a produto", async () => {
    const produtoRepository = new ProdutoInMemoryRepository();
    const useCase = new DeleteProdutoUseCase(produtoRepository);

    const input: ProdutoInputDTO = {
      titulo: "Produto Teste",
      descricao: "Descrição do produto teste",
      // codigo: "ABC23456",
      // valorElo7: 40,
      valorVenda: 20,
      valorCusto: 10,
      materiais: ["Material 1", "Material 2"],
      prazoProducao: "10 dias",
    };

    const produto = new Produto(input);

    await produtoRepository.save(produto);

    const result = await useCase.execute(produto.id);

    expect(result.isRight()).toBeTruthy();
  });
});
