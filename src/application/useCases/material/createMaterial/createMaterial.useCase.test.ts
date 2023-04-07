import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { MaterialInMemoryRepository } from "../../../../infrastructure/repositories/material/materialInMemory.repository";
import { CreateMaterialUseCase } from "./createMaterial.useCase";
import { describe, it, expect} from 'vitest';
describe("CreateMaterialUseCase", () => {
  it("should create a new material", async () => {
    const materialRepository = new MaterialInMemoryRepository();
    const useCase = new CreateMaterialUseCase(materialRepository);

    const input: MaterialInputDTO = {
      titulo: "Material Teste",
      descricao: "Descrição do material teste",
      valor: 20,
      unidadeMedidaId: "1"
    };

    const result = await useCase.execute(input);

    const material = result.value.getValue() as Material;

    expect(material.codigo).toMatch(/[A-Z]{3}\d{6}/);
    expect(material.titulo).toBe(input.titulo);
    expect(material.descricao).toBe(input.descricao);
    expect(material.valor).toBe(input.valor);
  });
});
