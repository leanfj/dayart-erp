import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Either, Left, Result, Right, left, right } from "../../../core/logic/result";
import { AppError } from "../../../core/shared/appError";
import { Usuario } from "../../../domain/entities/usuario/usuario.entity";
import { UsuarioMapper } from "../../../domain/mappers/usuario/usuario.mapper";
import { UsuarioRepository } from "../../../domain/repositories/usuario/usuario.repository";
import { UsuarioModel } from "../../database/models";
import { UsuarioRepositoryErrors } from "./usuarioRepositoryErrors";

type Response = Either<AppError.UnexpectedError, Result<Usuario>>;

export class UsuarioDBRepository implements UsuarioRepository {
  constructor() {}
  
  findByEmail(email: string): Promise<Left<AppError.UnexpectedError, Result<Usuario>> | Right<AppError.UnexpectedError, Result<Usuario>>> {
    throw new Error("Method not implemented.");
  }

  async findById(id: UniqueEntityID): Promise<Response> {
    try {
      const usuarioData = await UsuarioModel.findByPk(id.toString());

      if (!usuarioData) {
        return left(new UsuarioRepositoryErrors.UsuarioNotExists());
      }

      const usuario = UsuarioMapper.toDomain(usuarioData);

      return right(Result.ok<Usuario>(usuario));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async exists(email: string): Promise<boolean> {
    const usuario = await UsuarioModel.findOne({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return false;
    }

    return true;
  }

  async save(usuario: Usuario): Promise<Response> {
    try {
      const newUsuario = UsuarioMapper.toDomain(usuario);
      
      await UsuarioModel.create({
        ...UsuarioMapper.toPersistence(newUsuario),
        dataCadastro: new Date(),
      });

      return right(Result.ok<Usuario>(newUsuario));
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async update(id: UniqueEntityID, input: any): Promise<Response> {
    try {
      const usuarioData = await this.findById(id);

      if (!usuarioData) {
        return left(new UsuarioRepositoryErrors.UsuarioNotExists());
      }

      await UsuarioModel.update(
        UsuarioMapper.toPersistence(input),
        {
          where: {
            id: id.toString(),
          },
        }
      );

      return right(
        Result.ok<Usuario>(
         UsuarioMapper.toDomain(input)
        )
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  async delete(id: UniqueEntityID): Promise<Response> {
    try {
      const usuarioData = await UsuarioModel.findByPk(id.toString());

      if (!usuarioData) {
        return left(new UsuarioRepositoryErrors.UsuarioNotExists());
      }
      await UsuarioModel.destroy({
        where: {
          id: id.toString(),
        },
      });

      return right(Result.ok<Usuario>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
