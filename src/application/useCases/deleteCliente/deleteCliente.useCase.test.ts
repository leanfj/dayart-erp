import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import {ClienteInMemoryRepository} from "../../../infrastructure/repositories/cliente/clienteInMemory.repository";
import { DeleteClienteUseCase } from "./deleteCliente.useCase";

describe("CreateClienteUseCase", () => {
  it("should create a new cliente", async () => {
    const clienteRepository = new ClienteInMemoryRepository();
    const useCase = new DeleteClienteUseCase(clienteRepository);

    const id = new UniqueEntityID();

    const result = await useCase.execute(id);

    expect(result.isRight()).toBeTruthy();

  });
});
