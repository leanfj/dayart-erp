import { ClienteInputDTO } from "../../../../domain/DTOS/cliente/cliente.dto";
import {ClienteInMemoryRepository} from "../../../../infrastructure/repositories/cliente/clienteInMemory.repository";
import { UpdateClienteUseCase } from "./updateCliente.useCase";
import { CreateClienteUseCase } from "../createCliente/createCliente.useCase";
import { Cliente } from "../../../../domain/entities/cliente/cliente.entity";
import { describe, it, expect} from 'vitest';
describe("CreateClienteUseCase", () => {
  it("should create a new cliente", async () => {
    const clienteRepository = new ClienteInMemoryRepository();
    const createUseCase = new CreateClienteUseCase(clienteRepository);
    const useCase = new UpdateClienteUseCase(clienteRepository);

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

    const createOrError = await createUseCase.execute(input);

    const cliente = createOrError.value.getValue() as Cliente;

    const updateInput: ClienteInputDTO = {
      id: cliente.id.toString(),
      nome: "John Doe",
      email: "email@email.com",
      genero: "masculino",
      telefone: "2122225555",
      endereco: "Rua 1, 123",
      cidade: "Rio de Janeiro",
      estado: "Rio de Janeiro",
      cep: "22222222",
      cpf: "22222222222",
      dataEvento: new Date(),
    }

    const result = await useCase.execute(updateInput);

    expect(result.isRight()).toBeTruthy();

  });
});
