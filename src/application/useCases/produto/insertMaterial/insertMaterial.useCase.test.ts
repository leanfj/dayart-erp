import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { ProdutoInMemoryRepository } from "../../../../infrastructure/repositories/produto/produtoInMemory.repository";
import { CreateProdutoUseCase } from "./createProduto.useCase";
import { describe, it, expect } from "vitest";
describe("CreateProdutoUseCase", () => {
  it("should create a new produto", async () => {
    const produtoRepository = new ProdutoInMemoryRepository();
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

    const result = await createProdutoUseCase.execute(input);
    expect(result.isRight()).toBeTruthy();
  });
});
