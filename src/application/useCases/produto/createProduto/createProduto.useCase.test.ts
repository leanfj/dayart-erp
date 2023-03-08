import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { ProdutoInMemoryRepository } from "../../../../infrastructure/repositories/produto/produtoInMemory.repository";
import { CreateProdutoUseCase } from "./createProduto.useCase";
import { describe, it, expect} from 'vitest';
describe("CreateProdutoUseCase", () => {
  it("should create a new produto", async () => {
    const produtoRepository = new ProdutoInMemoryRepository();
    const useCase = new CreateProdutoUseCase(produtoRepository);

    const input: ProdutoInputDTO = {
      titulo: "Produto Teste",
      descricao: "Descrição do produto teste",
      valorVenda: 20,
      valorCusto: 10,
      materiais: ["Material 1", "Material 2"],
      prazoProducao: "10 dias",
    };

    const result = await useCase.execute(input);
    expect(result.isRight()).toBeTruthy();
  });
});
