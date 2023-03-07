import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { RandomCode } from "../../../../domain/valueObjects/produto/randomCode";
import { ProdutoInMemoryRepository } from "../../../../infrastructure/repositories/produto/produtoInMemory.repository";
import { CreateProdutoUseCase } from "./createProduto.useCase";

describe("CreateProdutoUseCase", () => {
  it("should create a new produto", async () => {
    const produtoRepository = new ProdutoInMemoryRepository();
    const useCase = new CreateProdutoUseCase(produtoRepository);

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

    const result = await useCase.execute(input);
    console.log(result.value.getValue());
    expect(result.isRight()).toBeTruthy();
  });
});
