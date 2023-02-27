import { UniqueEntityID } from "../../../core/domain/uniqueIdEntity";
import { Cliente } from "../../entities/cliente/cliente.entity";

export interface ClienteRepository {
  findAll(): Promise<Cliente[]>;
  findById(id: string | UniqueEntityID): Promise<Cliente>;
  exists(id: string): Promise<boolean>;
  save(cliente: Cliente): Promise<void>;
  update(id: string | UniqueEntityID, cliente: Cliente): Promise<Cliente>;
  delete(id: string | UniqueEntityID): Promise<void>;
}
