import { UnidadeMedidaInputDTO } from "../../../../domain/DTOS/unidadeMedida/unidadeMedida.dto";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaInMemoryRepository } from "../../../../infrastructure/repositories/unidadeMedida/unidadeMedidaInMemory.repository";
import { CreateUnidadeMedidaUseCase } from "../createUnidadeMedida/createUnidadeMedida.useCase";
import { GetAllUnidadeMedidaUseCase } from "./getAllUnidadeMedida.usecase";
import { describe, it, expect} from 'vitest';
describe("GetAllUnidadeMedidaUseCase", () => {
  it("should get all unidadeMedida list", async () => {
    const unidadeMedidaRepository = new UnidadeMedidaInMemoryRepository();

    const useCase = new GetAllUnidadeMedidaUseCase(unidadeMedidaRepository);
    const createUnidadeMedidaUseCase = new CreateUnidadeMedidaUseCase(unidadeMedidaRepository);

    const input: UnidadeMedidaInputDTO = {
      nome: "Centímetro Cúbico",
      nomenclatura: "cm³",
      categoria: "volume",
    };

    await createUnidadeMedidaUseCase.execute(input);

    const result = await useCase.execute();

    const unidadeMedida = result.value.getValue() as UnidadeMedida;

    expect(unidadeMedida[0].nome).toBe(input.nome);
  });

  it("should be receive an empty array list", async () => {
    const unidadeMedidaRepository = new UnidadeMedidaInMemoryRepository();

    const useCase = new GetAllUnidadeMedidaUseCase(unidadeMedidaRepository);

    const result = await useCase.execute();

    expect(result.value.getErrorValue()).toEqual({ message: 'The UnidadeMedida List is empty' });
  });
});
