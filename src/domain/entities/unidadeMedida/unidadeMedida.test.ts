import { UnidadeMedidaInputDTO } from "../../DTOS/unidadeMedida/unidadeMedida.dto";
import { UnidadeMedida } from "./unidadeMedida.entity";
import { describe, it, expect } from "vitest";
describe("UnidadeMedida", () => {
  it("should be defined", () => {

    const input: UnidadeMedidaInputDTO = {
      nome: "Centímetro Cúbico",
      nomenclatura: "cm³",
      categoria: "VOLUME",
    }
  
    const unidadeMedida = UnidadeMedida.create(input);

    expect(unidadeMedida.nome).toBe("Centímetro Cúbico");
  });
});
