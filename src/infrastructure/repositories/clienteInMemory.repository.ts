import { Cliente } from "../../domain/entities/cliente/cliente.entity";
import { ClienteRepository } from "../../domain/repositories/cliente/cliente.repository";

export class ClienteInMemoryRepository implements ClienteRepository {
  private clientes: Cliente[] = [];

  async findAll(): Promise<Cliente[]> {
    return this.clientes;
  }

  async findById(id: string): Promise<Cliente> {
    const cliente = this.clientes.find((cliente) => cliente.props.id === id);

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    return cliente;
  }

  async exists(nome: string): Promise<boolean> {
    const cliente = this.clientes.find((cliente) => cliente.props.nome === nome);

    if (!cliente) {
      return false;
    }

    return true;

  }
  async save(cliente: Cliente): Promise<void> {
    const newCliente = Cliente.create({
      nome: cliente.props.nome,
      email: cliente.props.email,
      genero: cliente.props.genero,
      telefone: cliente.props.telefone,
      endereco: cliente.props.endereco,
      cidade: cliente.props.cidade,
      estado: cliente.props.estado,
    });

    this.clientes.push(newCliente);
  }

  async update(id: string, input: any): Promise<Cliente> {
    const index = this.clientes.findIndex((cliente) => cliente.props.id === id);

    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }

    const cliente = this.clientes[index];

    this.clientes[index] = { ...cliente, ...input };

    return this.clientes[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.clientes.findIndex((c) => c.props.id === id);

    if (index === -1) {
      throw new Error("Cliente não encontrado");
    }

    this.clientes.splice(index, 1);
  }
}
