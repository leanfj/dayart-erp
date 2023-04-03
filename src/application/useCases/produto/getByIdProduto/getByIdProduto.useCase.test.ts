import { UniqueEntityID } from "../../../../core/domain/uniqueIdEntity";
import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
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
    const produto = new Produto(input);

    await produtoRepository.save(produto);

    const result = await useCase.execute(produto.id);

    expect(result.isRight()).toBeTruthy();
  });
});
