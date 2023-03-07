import { RandomCode } from "../../../domain/valueObjects/produto/randomCode";
import { Produto } from "./produto.entity";
import { ValorElo7 } from "../../../domain/valueObjects/produto/valorElo7";

describe('Produto', () => {
  it('should be defined', () => {
    const produto = new Produto(
        {
            titulo: 'Produto Teste',
            codigo: new RandomCode(),
            descricao: 'Descrição do produto teste',
            valorVenda: 20,
            valorCusto: 10,
            materiais: ['Material 1', 'Material 2'],
            prazoProducao: '10 dias',
            valorElo7: new ValorElo7(20)
        }
    );
    expect(produto.codigo).toHaveLength(9);
  });
})