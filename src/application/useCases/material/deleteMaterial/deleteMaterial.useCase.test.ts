import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { MaterialInMemoryRepository } from "../../../../infrastructure/repositories/material/materialInMemory.repository";
import { DeleteMaterialUseCase } from "./deleteMaterial.useCase";
import { describe, it, expect} from 'vitest';
describe("DeleteMaterialUseCase", () => {
  it("should delete a material", async () => {
    const materialRepository = new MaterialInMemoryRepository();
    const useCase = new DeleteMaterialUseCase(materialRepository);

    const input: MaterialInputDTO = {
      titulo: "Material Teste",
      descricao: "Descrição do material teste",
      valor: 20,
      unidadeMedida: "un",
    };

    const material = new Material(input);

    await materialRepository.save(material);

    const result = await useCase.execute(material.id);

    expect(result.isRight()).toBeTruthy();
  });
});
