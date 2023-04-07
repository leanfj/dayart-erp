import { UnidadeMedidaInputDTO } from "../../../../domain/DTOS/unidadeMedida/unidadeMedida.dto";
import { UnidadeMedida } from "../../../../domain/entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaInMemoryRepository } from "../../../../infrastructure/repositories/unidadeMedida/unidadeMedidaInMemory.repository";
import { CreateUnidadeMedidaUseCase } from "../createUnidadeMedida/createUnidadeMedida.useCase";
import { UpdateUnidadeMedidaUseCase } from "./updateUnidadeMedida.useCase";
import { describe, it, expect } from "vitest";
describe("CreateUnidadeMedidaUseCase", () => {
  it("should create a new unidadeMedida", async () => {
    const unidadeMedidaRepository = new UnidadeMedidaInMemoryRepository();
    const updateUnidadeMedidauseCase = new UpdateUnidadeMedidaUseCase(unidadeMedidaRepository);
    const createUnidadeMedidauseCase = new CreateUnidadeMedidaUseCase(unidadeMedidaRepository);

    const input: UnidadeMedidaInputDTO = {
      nome: "Centímetro Cúbico",
      nomenclatura: "cm³",
      categoria: "volume",
    };

    const createOrErro = await createUnidadeMedidauseCase.execute(input);
    const createdUnidadeMedida = createOrErro.value.getValue() as UnidadeMedida;

    const updateInput: UnidadeMedidaInputDTO = {
      nome: "Centímetro Quadrado",
      nomenclatura: "cm²",
      categoria: "volume",
    };

    const Request = {
      id: createdUnidadeMedida.id.toString(),
      props: updateInput,
    };

    const updateOrError = await updateUnidadeMedidauseCase.execute(Request);

    expect(updateOrError.isRight()).toBeTruthy();
  });
});
