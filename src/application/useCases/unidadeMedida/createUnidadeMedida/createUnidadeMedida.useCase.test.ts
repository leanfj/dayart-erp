import { UnidadeMedidaInputDTO } from "../../../../domain/DTOS/unidadeMedida/unidadeMedida.dto";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaInMemoryRepository } from "../../../../infrastructure/repositories/unidadeMedida/unidadeMedidaInMemory.repository";
import { CreateUnidadeMedidaUseCase } from "./createUnidadeMedida.useCase";
import { describe, it, expect} from 'vitest';
describe("CreateUnidadeMedidaUseCase", () => {
  it("should create a new unidadeMedida", async () => {
    const unidadeMedidaRepository = new UnidadeMedidaInMemoryRepository();
    const useCase = new CreateUnidadeMedidaUseCase(unidadeMedidaRepository);

    const input: UnidadeMedidaInputDTO = {
      nome: "Centímetro Cúbico",
      nomenclatura: "cm³",
      categoria: "volume",
    };

    const result = await useCase.execute(input);

    const unidadeMedida = result.value.getValue() as UnidadeMedida;

    expect(unidadeMedida.nome).toBe(input.nome)
    expect(unidadeMedida.categoria).toEqual(input.categoria.toUpperCase())

  });
});
