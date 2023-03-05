import { Mapper } from "../../../core/shared/mapper";
import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Usuario } from "../../entities/usuario/usuario.entity";

export abstract class UsuarioMapper implements Mapper<Usuario> {
  public static toDomain(raw: any): Usuario {
    const usuario = Usuario.create(
      {
        nome: raw.nome,
        email: raw.email,
        password: raw.password,
        isActive: raw.isActive,
      },
      new UniqueEntityID(raw.id)
    );

    return usuario;
  }

  public static toPersistence(usuario: Usuario): any {
    return {
      nome: usuario.nome,
      email: usuario.email,
      password: usuario.password,
      is_active: usuario.isActive,
    };
  }
}
