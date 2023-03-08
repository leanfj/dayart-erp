import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { GetUsuarioByEmailUseCase } from "./GetUsuarioByEmail.useCase";
import { RegisterUsuarioUseCase } from "../registerUsuario/registerUsuario.useCase";
import { describe, it, expect} from 'vitest';
describe("GetUsuarioByEmailUseCase", () => {
  it("should return finded usuario by emial", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const registerUsuarioUseCase = new RegisterUsuarioUseCase(usuarioRepository);
    const getUsuarioByEmailUseCase = new GetUsuarioByEmailUseCase(usuarioRepository);

    const input: UsuarioInputDTO = {
      nome: "John Doe",
      email: "john@doe.com.br",
      password: "a1mA9mQ1r^2!",
    };

    const result = await registerUsuarioUseCase.execute(input);
    const usuario = result.value.getValue() as unknown as Usuario;
    const usuarioFinded = await getUsuarioByEmailUseCase.execute(usuario.email); 
    expect(usuarioFinded.isRight()).toBeTruthy();
    
  });
});
