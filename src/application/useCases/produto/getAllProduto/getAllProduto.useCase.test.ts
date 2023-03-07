import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { ProdutoInMemoryRepository } from "../../../../infrastructure/repositories/produto/produtoInMemory.repository";
import { CreateProdutoUseCase } from "../createProduto/createProduto.useCase";
import { GetAllProdutoUseCase } from "./getAllProduto.usecase";

describe("GetAllProdutoUseCase", () => {
  it("should get all produto list", async () => {
    const produtoRepository = new ProdutoInMemoryRepository();

    const useCase = new GetAllProdutoUseCase(produtoRepository);
    const createProdutoUseCase = new CreateProdutoUseCase(produtoRepository);

    const input: ProdutoInputDTO = {
      titulo: "Produto 1",
      descricao: "Descrição do produto 1",
      valorVenda: 100,
      valorCusto: 50,
      materiais: ["Materiais do produto 1", "Materiais do produto 2"],
      prazoProducao: "10 dias",
    };

    await createProdutoUseCase.execute(input);

    const result = await useCase.execute();

    const produto = result.value.getValue() as Produto;

    expect(produto[0].titulo).toBe(input.titulo);
  });

  it("should be receive an empty array list", async () => {
    const produtoRepository = new ProdutoInMemoryRepository();

    const useCase = new GetAllProdutoUseCase(produtoRepository);

    const result = await useCase.execute();

    expect(result.value.getErrorValue()).toEqual({ message: 'The Produto List is empty' });
  });
});
