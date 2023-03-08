import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import {ProdutoInMemoryRepository} from "../../../../infrastructure/repositories/produto/produtoInMemory.repository";
import { CreateProdutoUseCase } from "../createProduto/createProduto.useCase";
import { UpdateProdutoUseCase } from "./updateProduto.useCase";
import { describe, it, expect} from 'vitest';
describe("CreateProdutoUseCase", () => {
  it("should create a new produto", async () => {
    const produtoRepository = new ProdutoInMemoryRepository();
    const updateProdutouseCase = new UpdateProdutoUseCase(produtoRepository);
    const createProdutouseCase = new CreateProdutoUseCase(produtoRepository);


    const input: ProdutoInputDTO = {
      titulo: "Produto 1",
      descricao: "Descrição do produto 1",
      valorVenda: 100,
      valorCusto: 50,
      materiais: ["Materiais do produto 1", "Materiais do produto 2"],
      prazoProducao: "10 dias",
    };

    const createOrErro = await createProdutouseCase.execute(input);
    const createdProduto = createOrErro.value.getValue() as Produto; 

    const updateInput: ProdutoInputDTO = {
      id: createdProduto.id.toString(),
      titulo: "Produto 1 Novo",
      descricao: "Descrição do produto 1",
      valorVenda: 100,
      valorCusto: 50,
      materiais: ["Materiais do produto 1", "Materiais do produto 2"],
      prazoProducao: "10 dias",
    }

    const updateOrError = await updateProdutouseCase.execute(updateInput);

    expect(updateOrError.isRight()).toBeTruthy();

  });
});
