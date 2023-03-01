import { ClienteInputDTO } from "../../../domain/DTOS/cliente/cliente.dto";
import { ClienteInMemoryRepository } from "../../../infrastructure/repositories/cliente/clienteInMemory.repository";
import { CreateClienteUseCase } from "./createCliente.useCase";

describe("CreateClienteUseCase", () => {
  it("should create a new cliente", async () => {
    const clienteRepository = new ClienteInMemoryRepository();
    const useCase = new CreateClienteUseCase(clienteRepository);

    const input: ClienteInputDTO = {
      nome: "John Doe",
      email: "john@doe.com.br",
      genero: "masculino",
      telefone: "2122225555",
      endereco: "Rua 1, 123",
      cidade: "Rio de Janeiro",
      estado: "Rio de Janeiro",
      cep: "22222222",
      cpf: "22222222222",
      dataEvento: new Date(),
    };

    const result = await useCase.execute(input);

    expect(result.isRight()).toBeTruthy();
  });
});
