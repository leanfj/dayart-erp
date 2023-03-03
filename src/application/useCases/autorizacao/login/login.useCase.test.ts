import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { LoginUseCase } from "../login/login.useCase";
import { RegisterUsuarioUseCase } from "../../usuario/registerUsuario/registerUsuario.useCase";
import { LoginInputDTO } from "domain/DTOS/login/loginInputDTO";

describe("LoginUseCase", () => {
  it("should return a valid token", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const registerUsuariouseCase = new RegisterUsuarioUseCase(usuarioRepository);
    const loginUseCase = new LoginUseCase(usuarioRepository);

    const input: UsuarioInputDTO = {
      nome: "Leandro",
      email: "leandro@email.com",
      password: "leanBIO!0",
    };

    await registerUsuariouseCase.execute(input);

    const loginInput: LoginInputDTO = {
      email: "leandro@email.com",
      password: "leanBIO!0",
    }

    const token = await loginUseCase.execute(loginInput);

    expect(token.isRight()).toBeTruthy();
  });
});
