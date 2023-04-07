import { UnidadeMedida } from "../../entities/unidadeMedida/unidadeMedida.entity";
import { UnidadeMedidaInputDTO } from "./unidadeMedida.dto";
import { validatorDTO } from "../../../core/domain/validatorDTO";
import { Left } from "../../../core/logic/result";
import { describe, it, expect} from 'vitest';

describe("UnidadeMedida DTO", () => {
  it("should create a valid UnidadeMedida",async () => {
    const input: UnidadeMedidaInputDTO = {
      nome: "Centímetro Cúbico",
      nomenclatura: "cm³",
      categoria: "Volume",
    };

    const unidadeMedida = UnidadeMedida.create({...input});

    expect(unidadeMedida.nome).toBe(input.nome);
  });

  it("should return error on data is empty ",async () => {
    const input: UnidadeMedidaInputDTO = {
      nome: "",
      nomenclatura: "",
      categoria: "",
    };

    const validOrError = await validatorDTO(UnidadeMedidaInputDTO, input, {});
    
    expect(validOrError).toBeInstanceOf(Left);
    
  });
});
