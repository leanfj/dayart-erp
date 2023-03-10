require('dotenv').config();
import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { LoginUseCase } from "../login/login.useCase";
import { RegisterUsuarioUseCase } from "../../usuario/registerUsuario/registerUsuario.useCase";
import { LoginInputDTO } from "../../../../domain/DTOS/login/loginInputDTO";
import { GetUsuarioByEmailUseCase } from "../../../../application/useCases/usuario/getUsuarioByEmail/GetUsuarioByEmail.useCase";
import { describe, it, expect} from 'vitest';
describe("LoginUseCase", () => {
  it("should return a valid token", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const registerUsuariouseCase = new RegisterUsuarioUseCase(usuarioRepository);
    const getUsuarioByEmail = new GetUsuarioByEmailUseCase(usuarioRepository);
    const loginUseCase = new LoginUseCase();

    const usuarioInput: UsuarioInputDTO = {
      nome: "Leandro",
      email: "leandro@email.com",
      password: "a1mA9mQ1r^2!",
    };

    await registerUsuariouseCase.execute(usuarioInput);

    const input: LoginInputDTO = {
      email: "leandro@email.com",
      password: "a1mA9mQ1r^2!",
    }

    const usarioOrError = await getUsuarioByEmail.execute(input.email);

    const usuario = usarioOrError.value.getValue() as unknown as Usuario;

    const token = await loginUseCase.execute({input, usuario});

    expect(token.isRight()).toBeTruthy();
  });
});
