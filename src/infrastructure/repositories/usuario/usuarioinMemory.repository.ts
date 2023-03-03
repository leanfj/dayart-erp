import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Result, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Usuario } from "../../../domain/entities/usuario/usuario.entity";
import { UsuarioRepository } from "../../../domain/repositories/usuario/usuario.repository";
import { UsuarioRepositoryErrors } from "./usuarioRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<Usuario>>;

export class UsuarioInMemoryRepository implements UsuarioRepository {
  private usuarios: Usuario[] = [];

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const usuarioData = this.usuarios.find((usuario) => usuario.id === id);
      if (!usuarioData) {
        return left(new UsuarioRepositoryErrors.UsuarioNotExists());
      }
      return right(Result.ok<Usuario>(usuarioData));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(email: string): Promise<boolean> {
    const usuario = this.usuarios.find((usuario) => usuario.email === email);

    if (!usuario) {
      return false;
    }

    return true;
  }

  async save(usuario: Usuario): Promise<Response> {
    try {
      const newUsuario = Usuario.create(
        {
          nome: usuario.nome,
          email: usuario.email,
          password: usuario.password,
          dataCadastro: usuario.dataCadastro || new Date(),
        },
        usuario.id
      );

      this.usuarios.push(newUsuario);
      return right(Result.ok<Usuario>(newUsuario));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: UniqueEntityID, input: any): Promise<Response> {
    try {
      const index = this.usuarios.findIndex((usuario) => usuario.id === id);
      if (index === -1) {
        return left(new UsuarioRepositoryErrors.UsuarioNotExists());
      }
      const usuario = this.usuarios[index];
      this.usuarios[index] = { ...usuario, ...input };
      return right(Result.ok<Usuario>(this.usuarios[index]));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const index = this.usuarios.findIndex((usuario) => usuario.id === id);
      if (index === -1) {
        return left(new UsuarioRepositoryErrors.UsuarioNotExists());
      }
      this.usuarios.splice(index, 1);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
