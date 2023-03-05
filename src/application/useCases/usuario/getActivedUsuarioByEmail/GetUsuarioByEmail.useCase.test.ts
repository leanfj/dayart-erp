import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { GetactivedUsuarioByEmailUseCase } from "./GetActivedUsuarioByEmail.useCase";
import { RegisterUsuarioUseCase } from "../registerUsuario/registerUsuario.useCase";

describe("GetActivedUsuarioByEmailUseCase", () => {
  it("should return finded usuario by emial", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const registerUsuarioUseCase = new RegisterUsuarioUseCase(usuarioRepository);
    const getactivedUsuarioByEmailUseCase = new GetactivedUsuarioByEmailUseCase(usuarioRepository);

    const input: UsuarioInputDTO = {
      nome: "John Doe",
      email: "john@doe.com.br",
      password: "S]iyx?$S*22W?MN",
      isActive: true
    };

    const result = await registerUsuarioUseCase.execute(input);
    const usuario = result.value.getValue() as unknown as Usuario;
    const usuarioFinded = await getactivedUsuarioByEmailUseCase.execute(usuario.email); 
    expect(usuarioFinded.isRight()).toBeTruthy();
    
  });
});
