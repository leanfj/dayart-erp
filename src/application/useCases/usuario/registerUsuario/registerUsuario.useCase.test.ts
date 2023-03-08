import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { RegisterUsuarioUseCase } from "./registerUsuario.useCase";
import { describe, it, expect} from 'vitest';
describe("RegisterUsuarioUseCase", () => {
  it("should create a new Usuario", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const useCase = new RegisterUsuarioUseCase(usuarioRepository);

    const input: UsuarioInputDTO = {
      nome: "John Doe",
      email: "john@doe.com.br",
      password: "a1mA9mQ1r^2!",
    };

    const result = await useCase.execute(input);

    expect(result.isRight()).toBeTruthy();
  });
});
