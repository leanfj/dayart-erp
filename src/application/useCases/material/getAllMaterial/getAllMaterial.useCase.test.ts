import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { MaterialInMemoryRepository } from "../../../../infrastructure/repositories/material/materialInMemory.repository";
import { CreateMaterialUseCase } from "../createMaterial/createMaterial.useCase";
import { GetAllMaterialUseCase } from "./getAllMaterial.usecase";
import { describe, it, expect} from 'vitest';
describe("GetAllMaterialUseCase", () => {
  it("should get all material list", async () => {
    const materialRepository = new MaterialInMemoryRepository();

    const useCase = new GetAllMaterialUseCase(materialRepository);
    const createMaterialUseCase = new CreateMaterialUseCase(materialRepository);

    const input: MaterialInputDTO = {
      titulo: "Material 1",
      descricao: "Descrição do material 1",
      valor: 100,
      unidadeMedidaId: "1",
      quantidade: 10,
      valorUnitario: 10,
    };

    await createMaterialUseCase.execute(input);

    const result = await useCase.execute();

    const material = result.value.getValue() as Material;

    expect(material[0].titulo).toBe(input.titulo);
  });

  it("should be receive an empty array list", async () => {
    const materialRepository = new MaterialInMemoryRepository();

    const useCase = new GetAllMaterialUseCase(materialRepository);

    const result = await useCase.execute();

    expect(result.value.getErrorValue()).toEqual({ message: 'The Material List is empty' });
  });
});
