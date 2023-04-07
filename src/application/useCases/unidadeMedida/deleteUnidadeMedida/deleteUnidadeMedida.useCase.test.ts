import { UnidadeMedidaInputDTO } from "../../../../domain/DTOS/unidadeMedida/unidadeMedida.dto";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaInMemoryRepository } from "../../../../infrastructure/repositories/unidadeMedida/unidadeMedidaInMemory.repository";
import { DeleteUnidadeMedidaUseCase } from "./deleteUnidadeMedida.useCase";
import { describe, it, expect} from 'vitest';
describe("DeleteUnidadeMedidaUseCase", () => {
  it("should delete a unidadeMedida", async () => {
    const unidadeMedidaRepository = new UnidadeMedidaInMemoryRepository();
    const useCase = new DeleteUnidadeMedidaUseCase(unidadeMedidaRepository);

    const input: UnidadeMedidaInputDTO = {
      nome: "Centímetro Cúbico",
      nomenclatura: "cm³",
      categoria: "volume",
    };

    const unidadeMedida = new UnidadeMedida(input);

    await unidadeMedidaRepository.save(unidadeMedida);

    const result = await useCase.execute(unidadeMedida.id);

    expect(result.isRight()).toBeTruthy();
  });
});
