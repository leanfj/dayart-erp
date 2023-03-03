import { Usuario } from "../../../../domain/entities/usuario/usuario.entity";
import { UsuarioInputDTO } from "../../../../domain/DTOS/usuario/usuario.dto";
import { UsuarioInMemoryRepository } from "../../../../infrastructure/repositories/usuario/usuarioinMemory.repository";
import { GetUsuarioByIdUseCase } from "./GetUsuarioById.useCase";
import { UseCaseError } from "../../../../core/domain/useCaseError";
import { RegisterUsuarioUseCase } from "../registerUsuario/registerUsuario.useCase";

describe("GetUsuarioByIdUseCase", () => {
  it("should return finded usuario by id", async () => {
    const usuarioRepository = new UsuarioInMemoryRepository();
    const useCase = new RegisterUsuarioUseCase(usuarioRepository);
    const getUsuarioByIdUseCase = new GetUsuarioByIdUseCase(usuarioRepository);

    const input: UsuarioInputDTO = {
      nome: "John Doe",
      email: "john@doe.com.br",
      password: "123456",
    };

    const result = await useCase.execute(input);
    const usuario = result.value.getValue() as unknown as Usuario;
    const usuarioFinded = await getUsuarioByIdUseCase.execute(usuario.id.toString()); 
    expect(usuarioFinded.isRight()).toBeTruthy();
    
  });
});
