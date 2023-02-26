import { CreateInputDTO } from "../../DTOS/cliente/cliente.dto";
import { Cliente } from "../../entities/cliente/cliente.entity";

export interface ClienteRepository {
  findAll(): Promise<Cliente[]>;
  findById(id: string): Promise<Cliente>;
  exists(id: string): Promise<boolean>;
  save(cliente: Cliente): Promise<void>;
  update(id: string, cliente: Cliente): Promise<Cliente>;
  delete(id: string): Promise<void>;
}
