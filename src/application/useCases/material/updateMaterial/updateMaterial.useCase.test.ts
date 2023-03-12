import { MaterialInputDTO } from "../../../../domain/DTOS/material/material.dto";
import { Material } from "../../../../domain/entities/material/material.entity";
import { MaterialInMemoryRepository } from "../../../../infrastructure/repositories/material/materialInMemory.repository";
import { CreateMaterialUseCase } from "../createMaterial/createMaterial.useCase";
import { UpdateMaterialUseCase } from "./updateMaterial.useCase";
import { describe, it, expect } from "vitest";
describe("CreateMaterialUseCase", () => {
  it("should create a new material", async () => {
    const materialRepository = new MaterialInMemoryRepository();
    const updateMaterialuseCase = new UpdateMaterialUseCase(materialRepository);
    const createMaterialuseCase = new CreateMaterialUseCase(materialRepository);

    const input: MaterialInputDTO = {
      titulo: "Material 1",
      descricao: "Descrição do material 1",
      valor: 100,
      unidadeMedida: "un",
    };

    const createOrErro = await createMaterialuseCase.execute(input);
    const createdMaterial = createOrErro.value.getValue() as Material;

    const updateInput: MaterialInputDTO = {
      titulo: "Material 1 Novo",
      descricao: "Descrição do material 1",
      valor: 100,
      unidadeMedida: "un",
    };

    const Request = {
      id: createdMaterial.id.toString(),
      props: updateInput,
    };

    const updateOrError = await updateMaterialuseCase.execute(Request);

    expect(updateOrError.isRight()).toBeTruthy();
  });
});
