
import { Mapper } from "../../core/shared/mapper";
import { UniqueEntityID } from "../../core/domain/uniqueIdEntity";
import { Cliente } from "../../domain/entities/cliente/cliente.entity";

export class ClienteMapper implements Mapper<Cliente> {

  public static toDomain (raw: any): Cliente {
    
    const cliente = Cliente.create({
        nome: raw.nome,
        email: raw.email,
        telefone: raw.telefone,
        endereco: raw.endereco,
        cidade: raw.cidade,
        estado: raw.estado,
        genero: raw.genero,
        cep: raw.cep,
        cpf: raw.cpf,
        dataEvento: raw.dataEvento
    }, new UniqueEntityID(raw.id))

    return cliente;
  }

  public static toPersistence (cliente: Cliente): any {
    return {
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        endereco: cliente.endereco,
        cidade: cliente.cidade,
        estado: cliente.estado,
        genero: cliente.genero,
        cep: cliente.cep,
        cpf: cliente.cpf,
        dataEvento: cliente.dataEvento
    }
  }
}