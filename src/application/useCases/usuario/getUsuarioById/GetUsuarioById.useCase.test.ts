import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { GetUsuarioByIdUseCase } from "./GetUsuarioById.useCase";

import { RegisterUsuarioUseCase } from "../registerUsuario/registerUsuario.useCase";
import { describe, it, expect} from 'vitest';
describe("GetUsuarioByIdUseCase", () => {
  it("should return finded usuario by id", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const useCase = new RegisterUsuarioUseCase(usuarioRepository);
    const getUsuarioByIdUseCase = new GetUsuarioByIdUseCase(usuarioRepository);

    const input: UsuarioInputDTO = {
      nome: "John Doe",
      email: "john@doe.com.br",
      password: "a1mA9mQ1r^2!",
    };

    const result = await useCase.execute(input);
    const usuario = result.value.getValue() as unknown as Usuario;
    const usuarioFinded = await getUsuarioByIdUseCase.execute(usuario.id.toString()); 
    expect(usuarioFinded.isRight()).toBeTruthy();
    
  });
});
