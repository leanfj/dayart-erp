import { Produto } from "./produto.entity";
import { describe, it, expect } from "vitest";
describe("Produto", () => {
  it("should be defined", () => {

    const input = {
      titulo: "Produto Teste",
      descricao: "Descrição do produto teste",
      valorVenda: 10,
      valorCusto: 5,
      materiais: ["Material 1", "Material 2"],
      prazoProducao: "10 dias",
    }
  
    const produto = Produto.create(input);

    expect(produto.codigo).toMatch(/[A-Z]{3}\d{6}/);

  });
});
