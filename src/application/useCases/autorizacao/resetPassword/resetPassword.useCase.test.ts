require("dotenv").config();

import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { RegisterUsuarioUseCase } from "../../usuario/registerUsuario/registerUsuario.useCase";
import { TokenInMemoryRepository } from "../../../../infrastructure/repositories/token/tokeninMemory.repository";
import { RequestResetPasswordUseCase } from "../requestResetPassword/requestResetPassword.useCase";
import { ResetPasswordUseCase } from "./resetPassword.useCase";

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
      password: "leanBIO!0",
    };

    await registerUsuariouseCase.execute(usuarioInput);

    const link = await requestResetPasswordUseCase.execute(
      "leandro@email.com"
    );

    const tokenAndUsuarioId = link.value.getValue().toString().replace(
      "http://localhost:3000/change-password?",
      ""
    );

    const token = tokenAndUsuarioId.split("&")[0].replace("token=", "");
    const usuarioId = tokenAndUsuarioId.split("&")[1].replace("usuarioId=", "");


    const resetResult = await resetPasswordUseCase.execute({
      usuarioId: usuarioId,
      token: token,
      password: "/C{fIpm0Oehv.zS"
    });

    expect(resetResult.value.getValue().toString()).toBe("Password reseted with success");
  });
});
