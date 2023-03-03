import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { RegisterUsuarioUseCase } from "./registerUsuario.useCase";

describe("RegisterUsuarioUseCase", () => {
  it("should create a new Usuario", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const useCase = new RegisterUsuarioUseCase(usuarioRepository);

    const input: UsuarioInputDTO = {
      nome: "John Doe",
      email: "john@doe.com.br",
      password: "123456",
    };

    const result = await useCase.execute(input);

    expect(result.isRight()).toBeTruthy();
  });
});
