import { ProdutoInputDTO } from "../../../../domain/DTOS/produto/produto.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { Produto } from "../../../../domain/entities/produto/produto.entity";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { ProdutoInMemoryRepository } from "../../../../infrastructure/repositories/produto/produtoInMemory.repository";
import { CreateProdutoUseCase } from "../createProduto/createProduto.useCase";
import { UpdateProdutoUseCase } from "./updateProduto.useCase";
import { describe, it, expect } from "vitest";
describe("CreateProdutoUseCase", () => {
  it("should create a new produto", async () => {
    const produtoRepository = new ProdutoInMemoryRepository();
    const updateProdutouseCase = new UpdateProdutoUseCase(produtoRepository);
    const createProdutouseCase = new CreateProdutoUseCase(produtoRepository);

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

    const createOrErro = await createProdutouseCase.execute(input);
    const createdProduto = createOrErro.value.getValue() as Produto;

    const updateInput: ProdutoInputDTO = {
      titulo: "Produto Teste 2",
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

    const Request = {
      id: createdProduto.id.toString(),
      props: updateInput,
    };

    const updateOrError = await updateProdutouseCase.execute(Request);

    expect(updateOrError.isRight()).toBeTruthy();

    const updatedProduto = updateOrError.value.getValue() as Produto;
    expect(updatedProduto.titulo).toBe(updateInput.titulo);

  });
});
