require('dotenv').config();

import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { RegisterUsuarioUseCase } from "../../usuario/registerUsuario/registerUsuario.useCase";
import { RequestResetPasswordUseCase } from "./requestResetPassword.useCase";
import { TokenInMemoryRepository } from "../../../../infrastructure/repositories/token/tokeninMemory.repository";

describe("RequestResetPasswordUseCase", () => {
  it("should return a valid link", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const tokenRepository = new TokenInMemoryRepository();
    const registerUsuariouseCase = new RegisterUsuarioUseCase(usuarioRepository);
    const requestResetPasswordUseCase = new RequestResetPasswordUseCase(usuarioRepository, tokenRepository);

    const usuarioInput: UsuarioInputDTO = {
      nome: "Leandro",
      email: "leandro@email.com",
      password: "leanBIO!0",
    };

    await registerUsuariouseCase.execute(usuarioInput);

    const token = await requestResetPasswordUseCase.execute("leandro@email.com");

    expect(token.isRight()).toBeTruthy();
  });
});
