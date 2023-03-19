import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { ProdutoInMemoryRepository } from "../../../../infrastructure/repositories/produto/produtoInMemory.repository";
import { CreateProdutoUseCase } from "../createProduto/createProduto.useCase";
import { GetAllProdutoUseCase } from "./getAllProduto.usecase";
import { describe, it, expect} from 'vitest';
describe("GetAllProdutoUseCase", () => {
  it("should get all produto list", async () => {
    const produtoRepository = new ProdutoInMemoryRepository();

    const useCase = new GetAllProdutoUseCase(produtoRepository);
    const createProdutoUseCase = new CreateProdutoUseCase(produtoRepository);

    const input: ProdutoInputDTO = {
      titulo: "Produto Teste",
      descricao: "Descrição do produto teste",
      valorVenda: 20,
      valorCusto: 10,
      prazoProducao: "10 dias",
      materiais: [
        Material.create({
          titulo: "Material 1",
          descricao: "Descrição do material 1",
          unidadeMedida: UnidadeMedida.create({
            nome: "Unidade",
            nomenclatura: "un",
            categoria: "UNIDADE",
          }),
          valor: 10,
          quantidade: 10,
        }),
        Material.create({
          titulo: "Material 2",
          descricao: "Descrição do material 2",
          unidadeMedida: UnidadeMedida.create({
            nome: "Unidade",
            nomenclatura: "un",
            categoria: "UNIDADE",
          }),
          valor: 100,
          quantidade: 10,
        }),
      ],
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
