import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import { ClienteInMemoryRepository } from "../../../infrastructure/repositories/cliente/clienteInMemory.repository";
import { CreateClienteUseCase } from "../createCliente/createCliente.useCase";
import { GetAllClienteUseCase } from "./getAllCliente.usecase";

describe("GetAllClienteUseCase", () => {
  it("should get all cliente list", async () => {
    const clienteRepository = new ClienteInMemoryRepository();

    const useCase = new GetAllClienteUseCase(clienteRepository);
    const createClienteUseCase = new CreateClienteUseCase(clienteRepository);

    const input: ClienteInputDTO = {
      nome: "John Doe",
      email: "john@doe.com.br",
      genero: "masculino",
      telefone: "2122225555",
      endereco: "Rua 1, 123",
      cidade: "Rio de Janeiro",
      estado: "Rio de Janeiro",
    };

    await createClienteUseCase.execute(input);

    const result = await useCase.execute();

    // expect(result.getValue()[0].props.nome).toBe(input.nome);
  });

  it("should be receive an empty array list", async () => {
    const clienteRepository = new ClienteInMemoryRepository();

    const useCase = new GetAllClienteUseCase(clienteRepository);

    const result = await useCase.execute();

    // expect(result.getValue()).toEqual([]);
  });

});
