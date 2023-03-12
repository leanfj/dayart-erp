import { Produto } from "../../entities/produto/produto.entity";
import { RandomCode } from "../../../core/domain/valueObjects/randomCode";
import { ProdutoInputDTO } from "./produto.dto";
import { validatorDTO } from "../../../core/domain/validatorDTO";
import { Left } from "../../../core/logic/result";
import { describe, it, expect} from 'vitest';

describe("Produto", () => {
  it("should create a valid Produto",async () => {
    const input: ProdutoInputDTO = {
      titulo: "Produto 1",
      descricao: "Descrição do produto 1",
      valorVenda: 10,
      valorCusto: 5,
      materiais: ["Material 1", "Material 2"],
      prazoProducao: "15 dias"
    };

    const produto = Produto.create({...input});

    expect(produto.titulo).toBe(input.titulo);
    expect(produto.descricao).toBe(input.descricao);
    expect(produto.valorVenda).toBe(input.valorVenda);
    expect(produto.valorCusto).toBe(input.valorCusto);
    expect(produto.materiais).toBe(input.materiais);
    expect(produto.prazoProducao).toBe(input.prazoProducao);
    
  });

  it("should return error on data is empty ",async () => {
    const input: ProdutoInputDTO = {
      titulo: "Produto 1",
      codigo: new RandomCode(),
      descricao: "Descrição do produto 1",
      valorVenda: 10,
      valorCusto: 5,
      materiais: ["Material 1", "Material 2"],
      prazoProducao: ""
    };

    const validOrError = await validatorDTO(ProdutoInputDTO, input, {});
    
    expect(validOrError).toBeInstanceOf(Left);
    
  });
});
