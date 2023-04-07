import { ProdutoInputDTO } from "../../DTOS/produto/produto.dto";
import { Material } from "../material/material.entity";
import { UnidadeMedida } from "../unidadeMedida/unidadeMedida.entity";
import { Produto } from "./produto.entity";
import { describe, it, expect } from "vitest";
describe("Produto", () => {
  it("should be defined", () => {

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
  
    const produto = Produto.create(input);

    expect(produto.codigo).toMatch(/[A-Z]{3}\d{6}/);

  });
});
