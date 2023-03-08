import { ClienteInputDTO } from "../../../../domain/DTOS/cliente/cliente.dto";
import { Cliente } from "../../../../domain/entities/cliente/cliente.entity";
import {ClienteInMemoryRepository} from "../../../../infrastructure/repositories/cliente/clienteInMemory.repository";
import { CreateClienteUseCase } from "../createCliente/createCliente.useCase";
import { DeleteClienteUseCase } from "./deleteCliente.useCase";
import { describe, it, expect} from 'vitest';
describe("DeleteClienteUseCase", () => {
  it("should delete a cliente", async () => {
    const clienteRepository = new ClienteInMemoryRepository();
    const createUseCase = new CreateClienteUseCase(clienteRepository);
    const useCase = new DeleteClienteUseCase(clienteRepository);

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

    const result = await useCase.execute(cliente.id);

    expect(result.isRight()).toBeTruthy();

  });
});
