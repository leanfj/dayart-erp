export interface ClienteInputDTO {
    nome: string;
    email: string;
    genero: string;
    telefone: string;
    endereco: string;
    cidade: string;
    estado: string;
    dataCadastro?: Date;
    dataAtualizacao?: Date;
  }