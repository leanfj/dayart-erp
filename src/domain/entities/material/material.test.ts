import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { Material } from "./material.entity";
import { describe, it, expect } from "vitest";
describe("Material", () => {
  it("should be defined", () => {

    const input = {
      titulo: "Material Teste",
      codigo: new RandomCode().Value,
      descricao: "Descrição do material teste",
      unidadeMedida: "un",
      valor: 20,
    }
  
    const material = Material.create(input);

    const codePattern = /[A-Z]{3}\d{6}/gm

    expect(material.codigo).toMatch(new RegExp(codePattern));
  });
});
