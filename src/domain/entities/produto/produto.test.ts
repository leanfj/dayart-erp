import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { Produto } from "./produto.entity";
import { ValorElo7 } from "../../../domain/valueObjects/produto/valorElo7";
import { describe, it, expect } from "vitest";
describe("Produto", () => {
  it("should be defined", () => {

    const input = {
      titulo: "Produto Teste",
      codigo: new RandomCode().Value,
      descricao: "Descrição do produto teste",
      valorVenda: 20,
      valorCusto: 10,
      materiais: ["Material 1", "Material 2"],
      prazoProducao: "10 dias",
      valorElo7: new ValorElo7(20).Value,
    }
  
    const produto = Produto.create(input);

    expect(produto.codigo).toHaveLength(9);
  });
});
