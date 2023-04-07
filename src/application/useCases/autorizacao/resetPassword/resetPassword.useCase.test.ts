require("dotenv").config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env",
});

import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { RegisterUsuarioUseCase } from "../../usuario/registerUsuario/registerUsuario.useCase";
import { TokenInMemoryRepository } from "../../../../infrastructure/repositories/token/tokeninMemory.repository";
import { RequestResetPasswordUseCase } from "../requestResetPassword/requestResetPassword.useCase";
import { ResetPasswordUseCase } from "./resetPassword.useCase";
import { describe, it, expect } from "vitest";
describe("ResetPasswordUseCase", () => {
  it("should return a success message", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const tokenRepository = new TokenInMemoryRepository();
    const registerUsuariouseCase = new RegisterUsuarioUseCase(
      usuarioRepository
    );
    const requestResetPasswordUseCase = new RequestResetPasswordUseCase(
      usuarioRepository,
      tokenRepository
    );
    const resetPasswordUseCase = new ResetPasswordUseCase(
      usuarioRepository,
      tokenRepository
    );

    const usuarioInput: UsuarioInputDTO = {
      nome: "Leandro",
      email: "leandro@email.com",
      password: "a1mA9mQ1r^2!",
    };

    await registerUsuariouseCase.execute(usuarioInput);

    const link = await requestResetPasswordUseCase.execute("leandro@email.com");

    const regexPatternURL =
      /http\:\/\/localhost\:3000#\/change-password\?|https\:\/\/dayart-web\.onrender\.com\/#\/change-password\?/gm;
    const tokenAndUsuarioId = link.value
      .getValue()
      .toString()
      .replace(regexPatternURL, "");
    const parameters = tokenAndUsuarioId.replace(regexPatternURL, "");

    const [token, usuarioId] = parameters.split("&");

    const resetResult = await resetPasswordUseCase.execute({
      usuarioId: usuarioId.replace("usuarioId=", ""),
      token: token.replace("token=", ""),
      password: "/C{fIpm0Oehv.zS",
    });

    expect(resetResult.value.getValue().toString()).toBe(
      "Password reseted with success"
    );
  });
});
